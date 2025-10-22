Linux Commands Guide for Beginners
This guide covers essential Linux commands you can use in the macOS Terminal (and Linux) for file and directory management, text processing, and system tasks. Each command is explained with its purpose, syntax, and common options, with examples relevant to working with files like nodes.js or directories like Data-Structure.


mkdir
Creates a new directory. Useful for organizing projects (e.g., creating a folder for Node.js scripts).
mkdir [directory]
- No option: mkdir myproject (creates myproject).- -p: Create parent directories: mkdir -p parent/child (creates nested directories).- Example: mkdir Data-Structure/code; ls (creates code inside Data-Structure).


pwd
Prints the current directory’s full path. Helps confirm your location (e.g., when in Data-Structure).
pwd
- No common options: pwd (outputs /Users/rohitgupta/Data-Structure).- Example: cd Data-Structure; pwd (shows current path).


cd
Changes the current directory. Used to navigate the filesystem (e.g., enter Data-Structure).
cd [directory]
- No argument: cd (goes to home directory, /Users/rohitgupta).- ..: Go up one level: cd ...- ~: Home directory: cd ~.- /: Root directory: cd /.- Example: cd Data-Structure; ls (enters and lists contents).


mv
Moves or renames files/directories. Useful for reorganizing (e.g., rename nodes.js).
mv [source] [destination]
- No option: mv nodes.js script.js (renames file).- -f: Force overwrite: mv -f nodes.js Data-Structure/.- Example: mv nodes.js Data-Structure/main.js; ls Data-Structure (moves file).


rm
Deletes files or directories. Cleans up unwanted files (e.g., remove test files).
rm [file] or rm -r [directory]
- No option: rm test.txt (deletes file).- -r: Recursive (for directories): rm -r Data-Structure.- -f: Force without prompt: rm -f test.txt.- Example: touch temp.txt; rm temp.txt; ls (creates and deletes). Caution: No recycle bin!


cp
Copies files or directories. Creates duplicates for backups (e.g., copy nodes.js).
cp [source] [destination]
- No option: cp nodes.js nodes_backup.js.- -r: Recursive (for directories): cp -r Data-Structure DS-backup.- -a: Preserve attributes (macOS): cp -a nodes.js nodes_copy.js.- Example: cp nodes.js Data-Structure/; ls Data-Structure.


grep
Searches for text patterns in files or output. Finds code or data (e.g., in nodes.js).
grep [pattern] [file]
- No option: grep "function" nodes.js (finds lines with “function”).- -i: Case-insensitive: grep -i "hello" nodes.js.- -r: Recursive (search directories): grep -r "function" Data-Structure.- Example: echo "Hello" > test.txt; grep "Hello" test.txt (outputs Hello).


cat
Displays or concatenates file contents. Views or combines files (e.g., check nodes.js).
cat [file]
- No option: cat nodes.js (shows contents).- Multiple files: cat file1.txt file2.txt (displays both).- Example: echo "Test" > test.txt; cat test.txt (outputs Test).- Tip: Create file: cat > new.txt (type, then Ctrl+D).


tar
Archives or extracts files into/from a single file. Bundles files (e.g., archive Data-Structure).
tar -cvf [archive.tar] [files] (create), tar -xvf [archive.tar] (extract)
- -c: Create archive: tar -cvf data.tar Data-Structure.- -x: Extract: tar -xvf data.tar.- -z: Compress with gzip: tar -zcvf data.tar.gz Data-Structure.- Example: tar -zcvf ds.tar.gz Data-Structure; tar -zxvf ds.tar.gz.


ls
Lists files and directories. Shows contents of directories (e.g., Data-Structure).
ls or ls [directory]
- No option: ls (lists files).- -l: Detailed list: ls -l (shows -rw-r--r--@ nodes.js).- -a: Show hidden files: ls -a (includes .zshrc).- -lh: Human-readable sizes: ls -lh.- Example: ls -l Data-Structure (lists contents with permissions).


rmdir
Deletes empty directories. Removes unused folders (less powerful than rm -r).
rmdir [directory]
- No option: rmdir empty (deletes empty folder).- Example: mkdir empty; rmdir empty; ls (creates and deletes).- Note: Fails if directory has files; use rm -r instead.


touch
Creates empty files or updates timestamps. Prepares files for editing (e.g., new scripts).
touch [file]
- No option: touch newfile.js (creates empty file).- Multiple files: touch file1.txt file2.txt.- Example: touch Data-Structure/script.js; ls Data-Structure.


zip
Compresses files into a .zip archive. Shares or stores files compactly.
zip [archive.zip] [files]
- No option: zip ds.zip nodes.js (creates ds.zip).- -r: Recursive (for directories): zip -r ds.zip Data-Structure.- Example: touch file.txt; zip myzip.zip file.txt; ls.


unzip
Extracts files from a .zip archive. Restores archived files.
unzip [archive.zip]
- No option: unzip ds.zip (extracts to current directory).- -d: Extract to directory: unzip ds.zip -d extract/.- Example: unzip myzip.zip; ls. Note: Install on Linux if needed (sudo apt install unzip).


chmod
Changes file/directory permissions. Controls access (e.g., make nodes.js executable).
chmod [permissions] [file]
- Symbolic: chmod u+x nodes.js (adds execute for owner).- Numeric: chmod 755 nodes.js (rwxr-xr-x).- -R: Recursive: chmod -R 755 Data-Structure.- Example: touch script.js; chmod +x script.js; ls -l (shows -rwxr-xr-x@).


echo
Prints text or writes to files. Creates files or shows variables.
echo [text] or echo [text] > [file]
- No option: echo "Hello" (prints Hello).- Redirect: echo "Test" > test.txt.- Append: echo "More" >> test.txt.- Variables: echo $PATH.- Example: echo "console.log('Hi');" > script.js; cat script.js.


find
Searches for files/directories by name, type, etc. Locates files (e.g., in Data-Structure).
find [path] -name [pattern]
- -name: find . -name "*.js" (finds .js files).- -type f: Files only: find Data-Structure -type f.- -type d: Directories: find . -type d.- Example: find Data-Structure -name "nodes.js".


man
Displays manual pages for commands. Learns command details.
man [command]
- No option: man ls (shows ls manual, press q to quit).- Search: /keyword within man.- Example: man chmod (learn permission options).


alias
Creates shortcuts for commands. Simplifies repetitive tasks.
alias [name]="[command]"
- No option: alias ll="ls -l" (creates ll shortcut).- Permanent: Add to ~/.zshrc: echo 'alias ll="ls -l"' >> ~/.zshrc; source ~/.zshrc.- Example: alias lsa="ls -a"; lsa (shows hidden files).


head
Displays the first few lines of a file. Previews files (e.g., nodes.js).
head [file]
- No option: head nodes.js (shows first 10 lines).- -n: Specify lines: head -n 2 nodes.js.- Example: echo -e "Line 1\nLine 2" > test.txt; head -n 1 test.txt (shows Line 1).


ln
Creates hard or symbolic links to files/directories. References files without copying.
ln [source] [target] (hard link) or ln -s [source] [target] (symbolic link)
- Hard link: ln nodes.js nodes_hard.js (same data).- Symbolic link: ln -s nodes.js nodes_soft.js (shortcut).- Example: touch file.txt; ln -s file.txt link.txt; ls -l (shows link.txt -> file.txt).


nano
Simple text editor for files. Edits scripts (e.g., nodes.js).
nano [file]
- No option: nano nodes.js (opens editor, Ctrl+O to save, Ctrl+X to exit).- Example: nano script.sh; # Add "#!/bin/bash\necho Hi"; chmod +x script.sh; ./script.sh.- Tip: Use for quick edits in Node.js scripts.

unalias ll        # Remove the alias
ll


The chmod command changes file/directory permissions in macOS/Linux, controlling who can read (r), write (w), or execute (x) a file (e.g., nodes.js) or directory (e.g., Data-Structure). Permissions appear in ls -l (e.g., -rw-r--r--@ or drwxr-xr-x@).

Permission Decoding
Format: 10 characters (e.g., -rw-r--r--@):

1st: Type (- = file, d = directory).

2-10: Permissions for owner (u), group (g), others (o) in groups of 3 (rwx).

r = read (4), w = write (2), x = execute (1), - = none (0).

macOS @: Extended attributes (ignore for chmod).

Numeric: Combine values (e.g., rwx = 7, rw- = 6, r-- = 4).

-rw-r--r-- = 644 (owner: read/write, others: read).

rwxr-xr-x = 755 (owner: full, others: read/execute).

Examples:
nodes.js (-rw-r--r--@): Owner (rohitgupta) can read/write (rw-), others read-only (r--). Numeric: 644. Can’t run ./nodes.js (no x), but node nodes.js works.


Data-Structure (drwxr-xr-x@): Owner can read/write/enter (rwx), others can read/enter (r-x). Numeric: 755.

chmod Command





Purpose: Modify permissions for files/directories (e.g., make nodes.js executable).



Syntax:

Symbolic: chmod [who][op][perm] [file] (e.g., u+x adds execute for owner).

Numeric: chmod [octal] [file] (e.g., 755).

Key Options: -R (recursive), -v (verbose).

chmod

Changes permissions for files/directories.

chmod [permissions] [file]


- Symbolic: chmod u+x nodes.js (adds execute, -rwxr--r--).
- Numeric: chmod 755 Data-Structure (rwxr-xr-x).
- -R: Recursive: chmod -R 700 Data-Structure (owner-only access, rwx------).
- Example: 
bash<br> touch nodes.js<br> chmod 755 nodes.js<br> ls -l # Shows -rwxr-xr-x@<br> chmod -R 755 Data-Structure<br> ls -l Data-Structure<br>

Practice in linux-practice

cd linux-practice
touch test.js
chmod 644 test.js     # rw-r--r--
ls -l test.js
chmod +x test.js      # rwxr-xr-x
chmod -R 700 Data-Structure  # drwx------
ls -l

Notes
