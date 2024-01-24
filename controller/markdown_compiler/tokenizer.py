# NEED TO ADD Paragraph and Table
def tokenize_main(string):
    delimiter = ",~"
    string_literal = split_on_delimiter(string, delimiter)
    return seperate_to_token(string_literal)

def split_on_delimiter(string, delimiter):
    return string.split(delimiter)

def seperate_to_token(str, returnArr = []):
    if  not len(str):
        # print(returnArr)
        return returnArr
        
    if str[0][0] == "\n":
        str = str[1::]
    # print(str[0][0])

    if str[0][0] == "#":
        returnArr.append(handle_hashtags(str[0], 0))
    elif str[0][0::] == "---":
        val = str
        returnArr.append({"value":0, "token":"---"})
    elif str[0][0:2] == "![":
        returnArr.append(handle_link(str[0][1::], True))
    elif str[0][0] == "[":
        returnArr.append(handle_link(str[0],False))
    # elif str[0][0:3] == "   " or str[0][0] == "-" and str[0][1] != "-" or str[0][0].isdigit() and str[0][0] != "!": 
        # token = handle_whitespace(str[0],0)
        # handle_recurse(str,[token])
    elif str[0][0:3] == "```":
        val = str[0][4:-3]
        returnArr.append({"value":val, "token":"```"})
    
    return seperate_to_token(str[1::], returnArr) 
# def handle_recurse(str,arr):

#     if len(str) > 1:
#         if arr[0]["count"] == handle_whitespace(str,0)["count"]:
#             arr.append(handle_whitespace(str[0],0))
#         if str[1][0:3] == "   " or str[1][0] == "-" and str[1][1] != "-" or str[1][0].isdigit() and str[1][0] != "!":
#             # print(str)
#             print(arr)
#     if len(str):
#         str.pop()
#     else:
#         return
#     return handle_recurse(str, arr)
def handle_hashtags(str, count):
    # print(str)
    if str[0] == "#":
        str = str[1::]
        return handle_hashtags(str, count+1)
    return {"len":count, "value":str, "token":"#"}

# def handle_whitespace(str, count):

#     if str[0:3] != "   ":
#         if str[0].isdigit():
#             val = f'{str[0]}.'
#         else:
#             val = "-"

#         return {"value":str[2::], "count":count, "token":val }
#     else:
#         str = str[3::]
#         return handle_whitespace(str, count+1)

def handle_link(str, bool):
    val=str[1::].split("](")
    val2 = val[1][:-1]
    if bool:
        token = "![]()"
    else:
        token = "[]()"
    return {"value":val[0],"link":val2, "token":token}

tokenize_main("""``` console.log("hello world") ```,~# h1,~## h2,~### h3,~#### h4,~##### h5,~###### h6,~1. one,~2. two,~3. three,~   1. test,~      1. test,~   2. test,~   3. test,~- one,~- two,~- three,~   - one,~   - two,~   - three,~---,~[title](https://www.johnodonnell.xyz),~![text](image.jpg)""")

    


    

