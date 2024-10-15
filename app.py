import requests
from bs4 import BeautifulSoup

# Send a request to the page
url = 'https://www.linkedin.com/feed/update/activity:7247894391921459200?trk=feed_main-feed-card_social-actions-comments'
response = requests.get(url)

# Parse the HTML content
soup = BeautifulSoup(response.content, 'html.parser')

# Get the entire HTML
html_content = soup.prettify()

print(html_content)
