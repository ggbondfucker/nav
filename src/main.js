const $siteList=$('.siteList')
const $lastLi= $siteList.find('li.last') 
const x= localStorage.getItem('x')
const xObject =JSON.parse(x)//把字符串变成对象
const hashMap = xObject || [
    {logo:'A',logoType:'text',url:'http://www.acfun.cn'},
    {logo:'B',logoType:'image',url:'https://www.bilibili.com'}
]
const simplifyUrl=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') //清除/开头的内容
}
const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li =$(`
        <li>
          <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
          </div>
        </li>
        `).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index,1)
            render()
        })
    })
}

render()

$('.addButton').on('click',()=>{
   let url= window.prompt('请输入添加网址：')
   if(url.indexOf('http')!==0){
       url='https://'+ url
   }
hashMap.push({
    logo:simplifyUrl(url)[0].toUpperCase(),
    logoType:'text',
    url:url,
})
    render()
})

$(window).on('beforeunload',()=>{
    const string =JSON.stringify(hashMap) //把对象变成字符串
    localStorage.setItem('x',string)
})

$(document).on('keypress',(e)=>{
    const key =e.key
    hashMap.forEach((node)=>{
        if(node.logo.toLowerCase()===key){
            window.open(node.url)
        }
    })
})