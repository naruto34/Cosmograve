function range(a,b,c){"undefined"==typeof b&&(b=a,a=0);"undefined"==typeof c&&(c=1);if(0<c&&a>=b||0>c&&a<=b)return[];for(var d=[];0<c?a<b:a>b;a+=c)d.push(a);return d};