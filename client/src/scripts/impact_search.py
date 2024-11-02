import requests

url = "https://serpapi.com/search?engine=google_trends&q=coffee&api_key=9ab2325751f82246015339dfab29ab14fb91824f6aecbe46fe0a03e438362492"

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"}

response = requests.get(url,headers=headers)

# Object should look like the following below
# newObject = [{ month: 'Oct', val: 99 }, { month: 'Nov', val: 25 }]

def get_monthly_results():
    new_url = "https://serpapi.com/searches/8ee3ae4fe36c36df/67266d85b28e6b2573e6f20c.json"
    new_response = requests.get(new_url,headers=headers)
    print(new_response.content)

get_monthly_results()