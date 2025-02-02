import requests

x = requests.get('https://api.themoviedb.org/3/movie/869626/images?api_key=e51741a421aab0b2de11139db6813331&language=en-US')
print(x.json())