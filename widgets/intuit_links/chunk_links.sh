#!/bin/bash

# Read all links from all_links.txt and save them 1000 at a time into JS files
iteration=1
count=0


while IFS= read -r link; do
  links+=("$link")
  ((count++))
  
  # When we reach 1000 links, write to file and reset
  if [ $count -eq 1000 ]; then
    filename="linkList_${iteration}.js"
    {
      echo "window.linkList = ["
      for i in "${!links[@]}"; do
        if [ $i -eq $((${#links[@]} - 1)) ]; then
          echo "  \"${links[$i]}\""
        else
          echo "  \"${links[$i]}\","
        fi
      done
      echo "];"
    } > "$filename"
    
    links=()
    count=0
    ((iteration++))
  fi
done < all_links.txt

# Write remaining links if any
if [ ${#links[@]} -gt 0 ]; then
  filename="linkList_${iteration}.js"
  {
    echo "window.linkList = ["
    for i in "${!links[@]}"; do
      if [ $i -eq $((${#links[@]} - 1)) ]; then
        echo "  \"${links[$i]}\""
      else
        echo "  \"${links[$i]}\","
      fi
    done
    echo "];"
  } > "$filename"
fi
