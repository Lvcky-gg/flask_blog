
def tokenize_main(string):
    delimiter = ",~"
    string_literal = split_on_delimiter(string, delimiter)
    return seperate_to_token(string_literal)

def split_on_delimiter(string, delimiter):
    return string.split(delimiter)

def seperate_to_token(str):
    returnArr = []
    for i in range(0, len(str)):
        
        if str[i][0] == "\n":
            str[i] = str[i][1::]


        if str[i][0] == "#":
            returnArr.append(handle_hashtags(str[i], 0))
        # handle this in another function to check if first is equal to a number
        elif str[i][0].isdigit() and str[i][0] != "!":
            val = str[i][0]
            val_2 = str[i][3::]
            returnArr.append({"value":val_2, "token":f'{val}.'})
        elif str[i][0] == "-" and str[i][1] != "-":
            val =str[i][2::]
            returnArr.append({"value":val, "token":"-"})
        elif str[i][0::] == "---":
            val = str[i]
            returnArr.append({"value":0, "token":"---"})
        elif str[i][0:2] == "![":
            # handle later
            pass
        elif str[i][0] == "[":
            returnArr.append(handle_link(str[i]))
        elif str[i][0:3] == "   ":
            # handle later
            pass
        elif str[i][0:3] == "```":
            val = str[i][4:-3]
            returnArr.append({"value":val, "token":"```"})
    print(returnArr)  

def handle_hashtags(str, count):
    if str[0] == "#":
        str = str[1::]
        return handle_hashtags(str, count+1)
    return {"len":count, "value":str.strip(), "token":"#"}

def handle_link(str):
    val=str[1::].split("](")
    val2 = val[1][:-1]
    return {"value":val[0],"link":val2, "token":"[]()"}
    


    

tokenize_main(
    """
``` console.log("hello world""); ```,~# h1,~## h2,~### h3,~#### h4,~##### h5,~###### h6,~1. one,~2. two,~3. three,~    1. test,~    2. test,~    3. test,~- one,~- two,~- three,~    - one,~    - two,~    - three,~---,~[title](https://www.johnodonnell.xyz),~![text](image.jpg)
              """)