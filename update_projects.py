import gspread
from oauth2client.service_account import ServiceAccountCredentials
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

# Write src/data/projects.json (React app imports it at build time)
with open("src/data/projects.json", "w", encoding="utf-8") as file:
    json.dump(
        [{"name": p["name"], "description": p["description"], "link": p["link"]} for p in projects],
        file, indent=2, ensure_ascii=False,
    )

# Git operations
repo = git.Repo(".")
repo.config_writer().set_value("user", "name", "CodeWithVedang").release()
repo.config_writer().set_value("user", "email", "shelatkarvedang2@gmail.com").release()
g_token = os.environ.get("G_TOKEN")
remote_url = f"https://CodeWithVedang:{g_token}@github.com/CodeWithVedang/My-PortFolio.git"
repo.remote(name="origin").set_url(remote_url)

repo.git.add("src/data/projects.json")
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