# Snapshot of the NYPD Press Room Videos site


You can view the mirrored version by visiting this URL:

http://wgetsnaps.github.io/nyc.gov--nypd-videos/html/nypd/html/pr/videos.shtml.html

This NYPD public relations video site and its bespoke Flash video player is a true gem of pre-iPhone web development. With __wget__ and __sed__ (and other Bash hackery), I was able to copy the source media files and rewire the Flash player so that it reads from the mirror, ensuring that this piece of jazzy police video work will not disappear in the next nyc.gov redesign.


<a href="http://wgetsnaps.github.io/nyc.gov--nypd-videos/html/nypd/html/pr/videos.shtml.html"><img src="nypd-pressroom-videos-page.jpg" alt="nypd video pr front page screenshot"></a>


This repository is a mirror of the following site:

|     Key     |                        Value                        |
|-------------|-----------------------------------------------------|
| Site title  | Press Room: Videos                                |
| Publisher   | New York Police Department                          |
| URL         | http://www.nyc.gov/html/nypd/html/pr/videos.shtml |
| Mirrored at | 2016-01-11 07:36:37                                 |





# Bash script and wget

Here are the Bash commands and __wget__ invocations I used to mirror the site. I use __sed__ to do some in-place replacements of absolute addresses in the XML file.


~~~sh
wget --recursive \
     --level 1 \
     --no-host-directories \
     --adjust-extension \
     --convert-links \
     --output-file /dev/stdout \
     http://www.nyc.gov/html/nypd/html/pr/videos.shtml |
     tee -a ./wget.log

# get xml file, swf, and js
echo http://www.nyc.gov/html/nypd/html/pr/videos.xml \
    http://www.nyc.gov/html/nypd/includes/scripts/flash.js  \
    http://www.nyc.gov/html/nypd/media/swf/videoPlayer_2.swf |
    tr ' ' "\n" |
    wget --force-directories \
         --no-host-directories \
         --output-file /dev/stdout \
         --input-file - |
         tee -a ./wget.log

# get all media files, by grepping the XMLs and piping into wget
cat ./html/nypd/html/pr/videos.xml | 
    grep -oE 'http.*<' | 
    tr -d '<' |
    wget --no-host-directories \
         --force-directories \
         --output-file /dev/stdout \
         --input-file - |
         tee -a ./wget.log

# translate the XML URLs to local urls
sed -i '.bak' 's@http://www.nyc.gov/html/nypd/@../../@g' \
    ./html/nypd/html/pr/videos.xml
~~~
