# AI_Sloppify
This firefox browser extension makes your google experience worse!

Oh yea it kinda works, but not really

![](./readme_assets/sc1.jpg)
![](./readme_assets/sc2.png)


### Requirements
* Ollama running as localhost with default port number
* Llama 3 model 
#### Model specific requirements
* ~1gb ram
* ~5gb vram
* ~5gb of storage
Note that the model is unloaded after a couple of minutes so these resouces (accept for storage) are only needed when generating slop

### Installation instructions
1. Download [Ollama](https://ollama.com/) from their website
2. Download the llama3 model with the command ``ollama pull llama3:8b`` (You can use other models, but the code was written to use this model. You can change that in main.js)
3. Download the project code and extract the zip file
4. Go to ``about:debugging`` in firefox and click "Load temporary Add-on..."
yer done

To remove everything from your system, go back to ``about:debugging``, click remove on the extension, run ``ollama rm llama3:8b``, and uninstall ollama


### TODO
* Fix formatting when google presents a list instead of a sentence
* Add ability to detect when google adds more "people also ask for" questions