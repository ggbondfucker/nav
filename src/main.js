//图片切换
const $touchlogo=$('.touchlogo')
const $baidu_big=$('.baidu_big')
const $searchlogo=$('.searchlogo')

//其他功能
const $siteList=$('.siteList')
const $lastLi= $siteList.find('li.last') 
const x= localStorage.getItem('x')
const xObject =JSON.parse(x)//把字符串变成对象
const hashMap = xObject || [
    {logo:'D',logoSrc:'images/douyu.png',logoType:'image',url:'http://www.douyu.com'},
    {logo:'B',logoSrc:'images/bilibili.png',logoType:'image',url:'https://www.bilibili.com'}
]
const simplifyUrl=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') //清除/开头的内容
}
const isimage=(logoType,node)=>{
    if(logoType==='image'){
        return '<img src="'+`${node.logoSrc}`+'"alt="">'
        
    }else{
        return `${node.logo[0]}`
    }
}
const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li =$(`
        <li>
          <div class="site">
            <div class="logo">${isimage(node.logoType,node)}</div>
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

// $(window).on('beforeunload',()=>{
//     const string =JSON.stringify(hashMap) //把对象变成字符串
//     localStorage.setItem('x',string)
// })

$(document).on('keypress',(e)=>{
    const key =e.key
    hashMap.forEach((node)=>{
        if(node.logo.toLowerCase()===key){
            window.open(node.url)
        }
    })
})


$touchlogo.on('click',()=>{
    
    $touchlogo.find('.baidu').fadeToggle(0).siblings('.google').fadeToggle(0)
    $searchlogo.find('.baidu_big').fadeToggle(0).siblings('.google_big').fadeToggle(0)
    if($('.baidu').css('display')!=='none'){
        $('.searchForm').prop('action','https://www.baidu.com/s')
    }else{
        $('.searchForm').prop('action','https://www.google.com/search?')
        
    }
    console.log($('.searchForm').prop('action'))
})