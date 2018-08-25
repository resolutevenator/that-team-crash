# that-team-crash

## Running the webpage

We need to use the command line to run the python server. [Mac users can use Terminal](http://www.wikihow.com/Open-a-Terminal-Window-in-Mac), 
[Windows users can use the Command Prompt](http://www.digitalcitizen.life/7-ways-launch-command-prompt-windows-7-windows-8), and Linux users 
should use whatever terminal app comes with their distro.

In your terminal/command line app navigate to the folder where index.html is located in your cloned repo (If you don't know what to do 
[Windows users can look here](http://www.digitalcitizen.life/command-prompt-how-use-basic-commands), 
[Linux and Mac users can look here](http://linuxcommand.org/lc3_lts0020.php)). Then run the command `python -m SimpleHTTPServer 8000`. 
When that is running you can point your browser to http://localhost:8000 to see the page running.

After you have loaded the page in the browser go back and look at the python server's output in the terminal. You should see a bunch of GET requests for certain files (and maybe you'll see a cheeky 404 error when the browser tries to fetch the non-existant favicon.ico).

_Note: SimpleHTTPServer will default to serving the index.html file at the root url_

_Note: If you are using python 3 then I think you will need to run_ `python -m http.server 8000` _instead._

_Note: You might be able to just open the index.html page in a browser, but most browsers have security features that disable a bunch of things we might need when loading files locally. The python server will help us get around these security restrictions._
