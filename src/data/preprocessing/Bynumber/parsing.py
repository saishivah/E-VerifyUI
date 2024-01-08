import json

json_file_path = "/Users/esshariprasad/UH/MOOC/react/react-tutorials/e-verify-employers-search/src/data/USA-E-verifed-employers.json"

# Open the JSON file in read mode
with open(json_file_path, "r") as json_file:
    # Load JSON data from the file
    data = json.load(json_file)

# Create a dictionary to store data by state
data_by_state = {}

# Group data by state
for item in data:
    state = item.get("Workforce Size", "").strip()
    if state:
        if state not in data_by_state:
            data_by_state[state] = []
        data_by_state[state].append(item)

# Create separate files for each state
for state, state_data in data_by_state.items():
    # Define the filename based on the state
    filename = f"{state}.json"

    # Write the state-specific data to a separate JSON file
    with open(filename, "w") as state_file:
        json.dump(state_data, state_file, indent=4)

    print(f"Created file for {state}: {filename}")