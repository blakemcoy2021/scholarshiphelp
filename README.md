# Scholarship Help Web App

Below contains how to setup this project on a local server (e.g. XAMPP)

Pre-requisite:
- xampp => apache+db server stack; download here: https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/7.4.24/xampp-portable-windows-x64-7.4.24-2-VC15.zip/download Link recommended is a portable version so just install or unzip it to the C:\ only containing it on a "C:\xampp" directory and make sure there are no existing xampp folder, inside the "C:\xampp\" directory should be the files and folders of xampp e.g. htdocs.

- Git => versioning tool; if you don't have any yet, download here: https://github.com/git-for-windows/git/releases/download/v2.33.1.windows.1/PortableGit-2.33.1-64-bit.7z.exe Link recommended is a portable version that you install and select a location where to unzip it (it'll be named on a folder `PortableGit` if ever). The `git-bash.exe` console will be the application that will be used from now on.

- VS Code or any development editor you wished to use.

---

Steps:

1) go to the "C:\xampp\htdocs" directory and create a folder name of this project with a name 'zscholarhelp'.
2) Open git-bash console or versioning app you use and go inside the directory created said on step 1
3) `git clone https://github.com/blakemcoy2021/scholarshiphelp.git` or go to this link and download the zip file of it and extract it on said directory on step 1 and 2 without its folder name
> (e.g. C:\xampp\htdocs\zscholarship\ must contain the index.html, register.html, css folder, js folder, etc.)
- on git cloning, if asked with credentials, enter your github account username if a window shows e.g. a window asking what to select, select "no helper" and if a window asking username, enter username, then another window pops up and do the same thing but in the password, use this
> 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
- you should see it download like seeing progress text like 'resolving deltas: 100% (58/58), done'
- if ever setup credential be asked to you, on the git bash console type the following:
>`git config --global user.email your_email_github_account `

>`git config --global user.name your_username_github_account `
4) after finished cloning, go to inside directory then type 'ls', should list the files and folders index.html, css folder, etc. as mention on step 3. Type 'git fetch' in that directory via git bash and when credentials had been asked, do the same thing in step 3.
5) initially, you will only see a README.md file that is not yet setup meaning you are in the `main` branch of the repository
6) `git checkout -b dpy1 origin\dyp1` this will create a local branch in your local dev environment (e.g. laptop or desktop) named dpy1 and download automatically its contents in th github dpy1 online branch.
7) you should be able to see the files you see on the dpy1 online branch (https://github.com/blakemcoy2021/scholarshiphelp/tree/dpy1) e.g. applist.html, js folder, css folder, data folder, etc. in the folder/directory you had created, inside `C:\xampp\htdocs\zscholarhelp\`
8) go to https://drive.google.com/drive/folders/1TiLz0Hys0-sbdy53YMWxPPpEmKOKK14q?usp=sharing where your updated database is found and download it.
9) go to `C:\xampp\` directory and find the `xampp-control.exe` app and run it.
10) the xampp control panel opens and click `start` on `apache` and `mysql` and it should work unless you have applications that uses port 3306 that you should be freeing up (e.g. stop service the application using 3306 port - skype, etc.)
11) click the `admin` button in the `mysql` row of the xampp control panel and redirect you to a popup browser for you to see phpmyadmin OR open your browser and type http://localhost/phpmyadmin
12) go back to xampp control panel and click `config` button on the row side of `apache` and select `phpMyAdmin (config.inc.php)` and once it open, find below and change the `config` to `cookie` then save:
> $cfg['Servers'][$i]['auth_type'] = 'config';
13) on the xampp control panel, stop `apache` and `mysql` then `start` these again.
14) refresh your `phpmyadmin` in the broser and it should show a `phpmyadmin login page` panel, login using blank password (nothing at all in the password field).
15) find the `change password` and type `toor` as your password and click `go`
16) if it redirects you or refresh to the phpmyadmin login page, type `root` as username and `toor` as password and you should be in the phpmyadmin panel again.
17) click `New` and create a database name `2021itdhvtsu_scholarhelp` using the `utf8mb4_bin` as collation setting then click `create` button
18) select that database you created and on the top side of it, find `Import` tab and click it.
19) click `Choose File` button and find the `sql file` you had downloaded in the google drive and scroll down; click `Go`.
20) it should auto-populate the create database tables like `tbl_scholar, tbl_user, tbl_cor, tbl_cog`, etc. tables
21) go to http://localhost/zscholarhelp/ in your browser and it should prompt you to the login page of this web app.
22) enjoy using it.

---

 - If this web app had been deployed in a remote server/hosting/cloud, just open your browser and type the domain name that will be purchased with this and the same login page as step 21 above will be experienced; skipping step 1 up to 20.

 ---

 # Changelogs:

 - soon

 # Learning References:
 - https://git-scm.com/download/win
 - https://www.youtube.com/watch?v=3RjQznt-8kE&list=PL4cUxeGkcC9goXbgTDQ0n_4TBzOO0ocPR