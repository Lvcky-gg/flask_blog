
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
        # elif str[i][0].isdigit() and str[i][0] != "!":
        #     val = str[i][0]
        #     val_2 = str[i][3::]
        #     returnArr.append({"value":val_2, "token":f'{val}.'})
        # elif str[i][0] == "-" and str[i][1] != "-":
        #     val =str[i][2::]
        #     returnArr.append({"value":val, "token":"-"})
        elif str[i][0::] == "---":
            val = str[i]
            returnArr.append({"value":0, "token":"---"})
        elif str[i][0:2] == "![":
            returnArr.append(handle_link(str[i][1::], True))
        elif str[i][0] == "[":
            returnArr.append(handle_link(str[i],False))
        elif str[i][0:3] == "   " or str[i][0] == "-" and str[i][1] != "-" or str[i][0].isdigit() and str[i][0] != "!":
            returnArr.append(handle_whitespace(str[i],0))
        elif str[i][0:3] == "```":
            val = str[i][4:-3]
            returnArr.append({"value":val, "token":"```"})
    return returnArr 

def handle_hashtags(str, count):
    if str[0] == "#":
        str = str[1::]
        return handle_hashtags(str, count+1)
    return {"len":count, "value":str.strip(), "token":"#"}

def handle_whitespace(str, count):

    if str[0:3] != "   ":
        if str[0].isdigit():
            val = f'{str[0]}.'
        else:
            val = "-"
        return {"value":str[2::], "count":count, "token":val }
    else:
        str = str[3::]
        return handle_whitespace(str, count+1)

def handle_link(str, bool):
    val=str[1::].split("](")
    val2 = val[1][:-1]
    if bool:
        token = "![]()"
    else:
        token = "[]()"
    return {"value":val[0],"link":val2, "token":token}

    


    

