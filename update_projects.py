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

# Sort projects by row number (assuming newer projects are at the bottom)
projects.sort(key=lambda x: x["row"], reverse=True)

# Function to populate portfolio container
def populate_portfolio(soup, projects_to_show):
    portfolio_container = soup.find("div", class_="vsproj-container")
    portfolio_container.clear()  # Clear existing projects

    if not projects_to_show:
        placeholder = soup.new_tag("p")
        placeholder.string = "No projects available at the moment."
        portfolio_container.append(placeholder)
    else:
        for project in projects_to_show:
            project_div = soup.new_tag("div", **{"class": "vsproj-box"})
            portfolio_layer = soup.new_tag("div", **{"class": "vsproj-layer"})
            
            # Project logo (Bootstrap icon)
            icon = soup.new_tag("i", **{"class": "bi bi-code-slash vsproj-icon"})
            portfolio_layer.append(icon)
            
            # Project title
            h4 = soup.new_tag("h4")
            h4.string = project["name"]
            portfolio_layer.append(h4)
            
            # Project description
            p = soup.new_tag("p")
            p.string = project["description"]
            portfolio_layer.append(p)
            
            # Project button
            button = soup.new_tag("a", href=project["link"], **{"class": "btn vsproj-btn"})
            button.string = "View Project"
            portfolio_layer.append(button)
            
            project_div.append(portfolio_layer)
            portfolio_container.append(project_div)

# Update index.html (3 latest projects)
with open("index.html", "r", encoding="utf-8") as file:
    index_soup = BeautifulSoup(file, "html.parser")

populate_portfolio(index_soup, projects[:3])  # Limit to 3 latest projects

with open("index.html", "w", encoding="utf-8") as file:
    file.write(str(index_soup.prettify()))

# Update myprojects.html (all projects)
with open("myprojects.html", "r", encoding="utf-8") as file:
    myprojects_soup = BeautifulSoup(file, "html.parser")

populate_portfolio(myprojects_soup, projects)  # All projects

with open("myprojects.html", "w", encoding="utf-8") as file:
    file.write(str(myprojects_soup.prettify()))

# Git operations
repo = git.Repo(".")
repo.config_writer().set_value("user", "name", "CodeWithVedang").release()
repo.config_writer().set_value("user", "email", "shelatkarvedang2@gmail.com").release()
g_token = os.environ.get("G_TOKEN")
remote_url = f"https://CodeWithVedang:{g_token}@github.com/CodeWithVedang/My-PortFolio.git"
repo.remote(name="origin").set_url(remote_url)

repo.git.add("index.html")
repo.git.add("myprojects.html")
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