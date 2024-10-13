## Node.js File Manager

This project is a command-line tool for managing files and directories. It offers various commands to navigate,
manipulate, and retrieve information about the filesystem.

### Available Commands

#### Navigation

- **`up`**:  
  Go to the parent directory from the current directory.

- **`cd path_to_directory`**:  
  Change to the specified directory. The `path_to_directory` can be either relative or absolute.

#### File Operations

- **`ls`**:  
  List all files and folders in the current directory.

- **`cat path_to_file`**:  
  Read and display the content of the specified file.

- **`add new_file_name`**:  
  Create an empty file with the specified `new_file_name` in the current working directory.

- **`rn path_to_file new_filename`**:  
  Rename `path_to_file` to `new_filename`.

- **`cp path_to_file path_to_new_directory`**:  
  Copy the specified file to the `path_to_new_directory`.

- **`mv path_to_file path_to_new_directory`**:  
  Move the specified file to the `path_to_new_directory`.

#### Operating System Info

- **`os --EOL`**:  
  Get the End-Of-Line marker for the current OS.

- **`os --cpus`**:  
  Get information about the CPUs of the host machine.

- **`os --homedir`**:  
  Get the home directory of the current user and print it to the console.

- **`os --username`**:  
  Get the username of the current system user.

- **`os --architecture`**:  
  Get the CPU architecture of the host machine.

#### Hashing

- **`hash path_to_file`**:  
  Calculate the SHA256 hash of the specified file and print it to the console.

#### Compression

- **`compress path_to_file path_to_destination`**:  
  Compress the specified file using the Brotli algorithm and save it to `path_to_destination`.

- **`decompress path_to_file path_to_destination`**:  
  Decompress the specified file using the Brotli algorithm and save it to `path_to_destination`.

### Example Usage

```sh
# Navigate to a directory
cd /path/to/directory

# List contents of the current directory
ls

# Read a file
cat /path/to/file.txt

# Create an empty file
add newfile.txt

# Rename a file
rn oldfile.txt newfile.txt

# Copy a file to another directory
cp file.txt /path/to/destination

# Move a file to another directory
mv file.txt /path/to/destination

# Get EOL marker
os --EOL

# Get CPU information
os --cpus

# Get home directory
os --homedir

# Get username
os --username

# Get CPU architecture
os --architecture

# Calculate SHA256 hash of a file
hash /path/to/file.txt

# Compress a file
compress /path/to/file.txt /path/to/destination.brotli

# Decompress a file
decompress /path/to/file.brotli /path/to/destination.txt
```