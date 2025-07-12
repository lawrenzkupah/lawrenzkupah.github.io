from flask import Flask, request, redirect, session, jsonify
from spotipy.oauth2 import SpotifyOAuth
import spotipy
import csv
import os

# Spotify API credentials
CLIENT_ID = 'your_spotify_client_id'
CLIENT_SECRET = 'your_spotify_client_secret'
REDIRECT_URI = 'https://a009-158-143-165-93.ngrok-free.app'
SCOPE = 'user-library-read user-read-playback-state user-read-recently-played'

app = Flask(__name__)
app.secret_key = 'random_secret_key'

# Initialize Spotify client
sp_oauth = SpotifyOAuth(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri=REDIRECT_URI, scope=SCOPE)
sp = None

# CSV file to store user data
DATA_FILE = 'user_data.csv'

# Create CSV file with headers if it doesn't exist
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['user_id', 'song_id', 'song_name', 'listen_count'])

@app.route('/')
def home():
    return "Welcome to the Spotify Listener Tracker!"

@app.route('/start-spotify-auth')
def start_spotify_auth():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/callback')
def callback():
    global sp
    token_info = sp_oauth.get_access_token(request.args['code'])
    session['token_info'] = token_info
    sp = spotipy.Spotify(auth=token_info['access_token'])
    return redirect('/track-listens')

@app.route('/track-listens')
def track_listens():
    if not sp:
        return redirect('/start-spotify-auth')

    # Get the currently playing track
    current_track = sp.current_playback()
    if current_track and current_track['is_playing']:
        track_id = current_track['item']['id']
        track_name = current_track['item']['name']
        user_id = session['token_info']['user_id']
        
        # Track listen count
        track_data = [user_id, track_id, track_name]
        track_found = False

        # Read existing data from CSV and update it
        with open(DATA_FILE, 'r', newline='') as f:
            rows = list(csv.reader(f))
            for row in rows:
                if row[0] == user_id and row[1] == track_id:
                    row[3] = str(int(row[3]) + 1)  # Increment listen count
                    track_found = True
                    break
            if not track_found:
                rows.append(track_data + [1])  # Add new song with initial listen count

        # Write updated data back to CSV
        with open(DATA_FILE, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerows(rows)

        return jsonify({"status": "success", "message": "Track data updated successfully."})
    else:
        return jsonify({"status": "error", "message": "No track is currently playing."})

if __name__ == "__main__":
    app.run(debug=True)
