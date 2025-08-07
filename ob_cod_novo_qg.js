const fs = require('node:fs').promises
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg'); 

document.addEventListener('DOMContentLoaded',()=>{
    const input = document.getElementById('legenda_para_filtrar')
    const nova_legenda = document.getElementById('legenda_digitada')
    const botao = document.getElementById('executar')
    const video = document.getElementById('video')
   
 botao.addEventListener('click', async () => {
  
   // const dados_finais = await Filtro_dados(input.value, nova_legenda.value);
  // dados_finais.forEach(linha =>{
  //  console.log(linha)
 //  })

   // const tudoComoTexto = dados_finais.join('\n');
    //await fs.writeFile(video.value+"novo.ass", tudoComoTexto, 'utf8');
    //await sleep(3000);
    
   
    console.log(video.value)
   //videoAdd([video.value])



});
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


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



 async function videoAdd(arquivos){
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);


// Processa cada arquivo individualmente
arquivos.forEach(arquivo => {
    // Arquivos de entrada e saída
    const inputVideo = `${arquivo}.mkv`;
    const inputLegenda = `${arquivo}novo.ass`;
    const overlayImage = 'Logo.png'
    const outputVideo = `${arquivo}-Legendado.mkv`;

   // Comando FFmpeg para queimar a legenda e adicionar logo ao mesmo tempo
    ffmpeg(inputVideo)
        .input(overlayImage)
        .complexFilter([
            // Queima legenda
            {
                filter: 'subtitles',
                options: inputLegenda,
                inputs: '[0:v]',
                outputs: 'legended'
            },
            // Redimensiona logo
            {
                filter: 'scale',
                options: {
                    w: 225,
                    h: 113
                },
                inputs: '[1:v]',
                outputs: 'logo'
            },
            // Sobrepõe logo na imagem legendada
            {
                filter: 'overlay',
                options: {  
                    x: 50,
                    y: 'main_h-overlay_h-30'
                },
                inputs: ['legended', 'logo']
            }
        ])
        .videoCodec('libx264')
        .outputOptions('-crf', '16')
        .on('start', (commandLine) => {
            console.log(`Comando executado: ${commandLine}`);
            console.log('Iniciando processamento...');
        })
        .on('progress', (progress) => {
            const percent = Math.round(progress.percent) || 0;
            const time = progress.timemark || '00:00:00';
            console.log(`Progresso: ${percent}% | Tempo: ${time} | Quadros: ${progress.frames}`);
        })
        .on('end', () => {
            console.log('\n✅ Processamento concluído!');
            console.log(`Arquivo salvo como: ${outputVideo}`);
            if (typeof window !== 'undefined' && window.finishProgressBar) {
                window.finishProgressBar(true, 'Processamento concluído com sucesso!');
            }
        })
        .on('error', (err) => {
            console.error('\n❌ Erro no processamento:', err.message);
            if (typeof window !== 'undefined' && window.finishProgressBar) {
                window.finishProgressBar(false, 'Ocorreu um erro: ' + err.message);
            }
        })
        .save(outputVideo);
});

function escapePath(path) {
    // Escapa espaços e caracteres especiais para o FFmpeg
    return `'${path.replace(/'/g, "'\\''")}'`;
}


}
    
    
    
    
    
    
    
    
    
    
    
    
    
  

   
   































