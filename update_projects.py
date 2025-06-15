import gspread
from oauth2client.service_account import ServiceAccountCredentials
from bs4 import BeautifulSoup
import git
import os
import json
from datetime import datetime

# Google Sheets setup
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds_json = os.environ.get("GOOGLE_SHEET_CREDENTIALS")
creds_dict = json.loads(creds_json)
creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
client = gspread.authorize(creds)
sheet_id = "1aEIWcjIaNARRXOCgF-I2BHW7vL0LEZk31hx5L0RvIDo"
sheet = client.open_by_key(sheet_id).worksheet("My-Projects")

# Fetch project data from Google Sheet
records = sheet.get_all_records()
projects = [
    {
        "name": record["Project Name"],
        "description": record["Description"],
        "link": record["Link"],
        "status": record["Status"],
        "row": idx + 2  # Row number for updating status (header is row 1)
    }
    for idx, record in enumerate(records)
]

# Read index.html
with open("index.html", "r", encoding="utf-8") as file:
    soup = BeautifulSoup(file, "html.parser")

# Find portfolio container
portfolio_container = soup.find("div", class_="portfolio-container")
portfolio_container.clear()  # Clear existing projects

# Add new project entries
for project in projects:
    project_div = soup.new_tag("div", class_="portfolio-box")
    portfolio_layer = soup.new_tag("div", class_="portfolio-layer")
    
    # Project title
    h4 = soup.new_tag("h4")
    h4.string = project["name"]
    portfolio_layer.append(h4)
    
    # Project description
    p = soup.new_tag("p")
    p.string = project["description"]
    portfolio_layer.append(p)
    
    # Project link
    a = soup.new_tag("a", href=project["link"])
    i = soup.new_tag("i", class_="fa-solid fa-up-right-from-square")
    a.append(i)
    portfolio_layer.append(a)
    
    project_div.append(portfolio_layer)
    portfolio_container.append(project_div)

# Write updated HTML back to index.html
with open("index.html", "w", encoding="utf-8") as file:
    file.write(str(soup.prettify()))

# Git operations
repo = git.Repo(".")
repo.git.add("index.html")
if repo.is_dirty():
    repo.git.commit(m=f"Update projects section - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Push to GitHub
    origin = repo.remote(name="origin")
    origin.push()
    
    # Update status in Google Sheet
    for project in projects:
        sheet.update_cell(project["row"], 4, "Pushed")
else:
    print("No changes to commit.")