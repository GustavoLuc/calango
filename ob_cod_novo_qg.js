const fs = require('node:fs').promises
const path = require('path');

document.addEventListener('DOMContentLoaded',()=>{
    const input = document.getElementById('legenda_para_filtrar')
    const nova_legenda = document.getElementById('legenda_digitada')
    const botao = document.getElementById('executar')
    const video = document.getElementById('video')
 botao.addEventListener('click', async () => {
  
    const dados_finais = await Filtro_dados(input.value, nova_legenda.value, video.value);
   dados_finais.forEach(linha =>{
    console.log(linha)
   })

    const tudoComoTexto = dados_finais.join('\n');
   await fs.writeFile('saida.ass', tudoComoTexto, 'utf8');



});
})




async function Filtro_dados(arquivo,legenda){
 

const data = await fs.readFile(arquivo, 'utf8')
       
let logs = [];
const originalConsoleLog = console.log;

console.log = (...args)=>{

logs.push(args.join(' '));
originalConsoleLog(...args);

}

try{
    
   estilo1 = 'Style: Default,Arial,40,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,1,10,10,10,1'
   estilo2 = 'Style: Titulo,Arial,40,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1'
   arquivo = 'Dialogue: 0,0:00:00.00,4:00:00.00,Titulo,,0,0,0,,{\\c&H00FFFF&\\pos(955,1030)}'+`${legenda}`
   localizacao = 'Dialogue: 0,0:00:00.00,4:00:00.00,Default,,0,0,0,,{\\c&H00FFFF&\\pos(1660,100)}Prof.: \\NAz.:'
   tempo = 'Dialogue: 0,0:00:00.00,4:00:00.00,Default,,0,0,0,,{\\c&H00FFFF&\\pos(50,100)}Data:\\NHora:'
   
   let filtrar2 = data.split('\n')
   

    filtrar2[11] = estilo1
    filtrar2.splice(11,0,estilo2)  //inserindo dado no meio do array 
    filtrar2.splice(16,0,arquivo,localizacao,tempo)  //inserindo dado no meio do array

   for(let i = 0; i < 19; i++){
    console.log(filtrar2[i])
    
   }
   

    //Heading Formato
   for(let i = 0; i < filtrar2.length; i++){

    const linha = filtrar2[i]
    
     if(linha.includes('Depth')){
         var posicao_depth 
         var limpando_chave2 = filtrar2[i].split('}');
           posicao = limpando_chave2[1].split('\\')
        if(posicao[0].includes('Depth')){
            posicao_depth = 0
        }else if(posicao[1].includes('Depth')){
            posicao_depth = 1
        }else if(posicao[2].includes('Depth')){
            posicao_depth = 2
        }else if(posicao[3].includes('Depth')){
            posicao_depth = 3
        }else if(posicao[4].includes('Depth')){
            posicao_depth = 4
        }
                        
           limpando_valor2 = filtrar2[i+1].split('}')
           posicao_valor2 = limpando_valor2[1].split('\\')
            inicio2 = limpando_valor2[0].split('\\')
            inicio2[1] = inicio2[1].replace('305','1760')
            inicio2[1] = inicio2[1].replace('1075','60')
           
           
         let  Depth_final =  inicio2[0]+'\\'+inicio2[1]+'}'+posicao_valor2[posicao_depth].replace('N','')
            console.log(Depth_final)
   }

   if(linha.includes('Heading')){
         var posicao_Heading 
         var limpando_chave = filtrar2[i].split('}');
           posicao2 = limpando_chave[1].split('\\');
        if(posicao2[0].includes('Heading')){
            posicao_Heading = 0
        }else if(posicao2[1].includes('Heading')){
            posicao_Heading = 1
        }else if(posicao2[2].includes('Heading')){
            posicao_Heading = 2
        }else if(posicao2[3].includes('Heading')){
            posicao_Heading = 3
        }else if(posicao2[4].includes('Heading')){
            posicao_Heading = 4
        }

           limpando_valor = filtrar2[i+1].split('}')
        posicao_valor = limpando_valor[1].split('\\')
        inicio = limpando_valor[0].split('\\')
        inicio[1] = inicio[1].replace('305','1760')
        inicio[1] = inicio[1].replace('1075','100')
        
      let Healding_final = inicio[0]+'\\'+inicio[1]+'}'+posicao_valor[posicao_Heading].replace('N','').replace(' deg','°')
       console.log(Healding_final)
    }
   //Time


   if(linha.includes('Time')){
         var posicao_Time 
         var limpando_chave_time = filtrar2[i].split('}');
           posicao3 = limpando_chave_time[1].split('\\');
        if(posicao3[0].includes('Time')){
            posicao_Time = 0
        }else if(posicao3[1].includes('Time')){
            posicao_Time = 1
        }else if(posicao3[2].includes('Time')){
            posicao_Time = 2
        }else if(posicao3[3].includes('Time')){
            posicao_Time = 3
        }else if(posicao3[4].includes('Time')){
            posicao_Time = 4
        }

            limpando_valor3 = filtrar2[i+1].split('}')
            posicao_valor3 = limpando_valor3[1].split('\\')
            inicio3 = limpando_valor3[0].split('\\')
            inicio3[1] = inicio3[1].replace('1615','140')
            inicio3[1] = inicio3[1].replace('1075','100')
        
         let Time_final =  inicio3[0]+'\\'+inicio3[1]+'}'+posicao_valor3[posicao_Time].replace('N','')
          console.log(Time_final)
    }

    //Data
    
    if(linha.includes('Date')){
         var posicao_Date 
         var limpando_chave_Date = filtrar2[i].split('}');
           posicao4 = limpando_chave_Date[1].split('\\');
        if(posicao4[0].includes('Date')){
            posicao_Date = 0
        }else if(posicao4[1].includes('Date')){
            posicao_Date = 1
        }else if(posicao4[2].includes('Date')){
            posicao_Date = 2
        }else if(posicao4[3].includes('Date')){
            posicao_Date = 3
        }else if(posicao4[4].includes('Date')){
            posicao_Date = 4
        }

            limpando_valor4 = filtrar2[i+1].split('}')
            posicao_valor4 = limpando_valor4[1].split('\\')
            inicio4 = limpando_valor4[0].split('\\')
            inicio4[1] = inicio4[1].replace('960','140')
            inicio4[1] = inicio4[1].replace('1075','60')
        
          let Date_final = inicio4[0]+'\\'+inicio4[1]+'}'+posicao_valor4[posicao_Date].replace('N','')
            console.log(Date_final)
    }
        
}

}finally{
    console.log = originalConsoleLog
} 
  return logs
    
} 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        // time_filtro = filtrar2[i+5].split('\\') //separando em array '\\N'
          // time_filtro[1] = time_filtro[1].split('}')
          // time_filtro[1][0] = time_filtro[1][0].replace('1615','140') //substituindo valor 
          // time_filtro[1][0] = time_filtro[1][0].replace('1075','100') //substituindo valor 
          // time_filtro[4] = time_filtro[4].replace('N','')

    //Data
           //data_filtro1 = filtrar2[i+6].split('\\') //separando em array '\\N'
          // data_filtro1[1] = data_filtro1[1].split('}')
          // data_filtro1[1][0] = data_filtro1[1][0].replace('10','140') //substituindo valor 
          // data_filtro1[1][0] = data_filtro1[1][0].replace('35','60') //substituindo valor 
           
           
        //Heading             
       // limpando_valor = filtrar2[i+1].split('}')
      //  posicao_valor = limpando_valor[1].split('\\')
       // inicio = limpando_valor[0].split('\\')
       // inicio[1] = inicio[1].replace('305','1760')
       //inicio[1] = inicio[1].replace('1075','100')
    
        
           
        //console.log(inicio[0]+'\\'+inicio[1]+'}'+posicao_valor[posicao_Heading].replace('N','').replace(' deg','°'))
        //console.log(time_filtro[0]+"\\"+time_filtro[1][0]+"}"+time_filtro[4])
        //console.log(data_filtro1[0]+"\\"+data_filtro1[1][0]+"}"+data_filtro1[1][1])
         
        
   
  

   
   

























/*
   
   //filtrar[11] = estilo1
   //filtrar.splice(11,0,estilo2)  //inserindo dado no meio do array 
   //filtrar.splice(16,0,legenda,localizacao,tempo)  //inserindo dado no meio do array

   for(let i = 0; i < 19; i++){
    //console.log(filtrar[i])
   }


   for(let i = 0; i < filtrar.length; i++)
       if(filtrar[i].includes('Depth')){
           linha_heading = filtrar[i].split('\\') //separando em array o '\' 
           v_heading = filtrar[i+1].split('\\')    //separando em array o '\'
            
           //Time
           time_filtro = filtrar[i+1].split('\\') //separando em array '\\N'
           time_filtro[1] = time_filtro[1].split('}')
           time_filtro[1][0] = time_filtro[1][0].replace('305','140') //substituindo valor 
           time_filtro[1][0] = time_filtro[1][0].replace('1075','60') //substituindo valor 
           
           //Data
           data_filtro1 = filtrar[i+6].split('\\')
           data_filtro1[1] = data_filtro1[1].split('}')
           data_filtro1[1][0] = data_filtro1[1][0].replace('10','140')
           data_filtro1[1][0] = data_filtro1[1][0].replace('35','60')
           

           data_final = data_filtro1[0]+'\\'+data_filtro1[1][0]+'}'+data_filtro1[1][1]
           
           // Heading e Depth
           
           v_heading_sem_deg = v_heading[1].replace(' deg','°') // substituindo 'deg' por '°'
           limpando_pos = v_heading[1].split('}')  //separando por '}'
           pos_limpo = limpando_pos[0]+'}' //removendo '}'
           //depth_sem_N = v_heading[4].replace('N','') //removendo o N
           pos_real = pos_limpo.replace('305','1760') //substituindo valor 
           pos_final = pos_real.replace('1075','100') //substituindo valor
           v_heading[1] = pos_final //setando valor no array correto
           //v_heading[4] = depth_sem_N //setando valor no array correto
           v_heading[5] = v_heading_sem_deg //setando valor no array correto
           //console.log(limpando_pos)
           
           linha_final_heading_e_depth = v_heading[0]+'\\'+v_heading[5]
           linha_final_time = time_filtro[0]+'\\'+time_filtro[1][0]+'}'+'\\'+time_filtro[2]

           
          
          //console.log(linha_final_heading_e_depth) //valor final do heading e depth
          //console.log(linha_final_time)
          //console.log(data_final)
           
    

}
*/






