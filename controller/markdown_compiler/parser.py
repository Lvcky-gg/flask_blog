from tokenizer import tokenize_main

def parser(string):
    arr = tokenize_main(string)
    retArr = []

    for i in range(len(arr)):
        val = arr[i]
        if val["token"]:
            if val["token"][0].isdigit() and val["token"][0] != "!" or val["token"] == "-":
                validate_token(val,val["count"],"")
                
                pass
            elif val["token"] == "```":
                retArr.append(f'<code>{val["value"]}<code/>')
            elif val["token"] == "#" and val["len"] <= 6:
                retArr.append(f'<h{val["len"]}>{val["value"]}<h{val["len"]}/>')
            elif val["token"] == "---":
                retArr.append("<hr/>")
            elif val["token"] == "[]()":
                retArr.append(f'<a alt="{val["value"]}" href="{val["link"]}"/>')
            elif val["token"] == "![]()":
                retArr.append(f'<image alt="{val["value"]} src="{val["link"]}"/>')
            # print(arr[i])
    print("".join(str(x + " ") for x in retArr))


def validate_token(dic, count, str):
    str+=f'<li>{dic["value"].strip()}<li/>'
    print(dic)
    print(str)



parser("""``` console.log("hello world") ```,~# h1,~## h2,~### h3,~#### h4,~##### h5,~###### h6,~1. one,~2. two,~3. three,~   1. test,~      1. test,~   2. test,~   3. test,~- one,~- two,~- three,~   - one,~   - two,~   - three,~---,~[title](https://www.johnodonnell.xyz),~![text](image.jpg)""")