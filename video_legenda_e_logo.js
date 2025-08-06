const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg'); 
const path = require('node:path');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const arquivos = [
    '2025-07-29_15.59.36',

];

// Processa cada arquivo individualmente
arquivos.forEach(arquivo => {
    // Arquivos de entrada e saída
    const inputVideo = `${arquivo}.mkv`;
    const inputLegenda = `${arquivo}.ass`;
    const outputVideo = `${arquivo}-Legendado.mkv`;

    // Comando FFmpeg para queimar a legenda
    ffmpeg(inputVideo)
        .outputOptions([
            '-vf', `subtitles=${escapePath(inputLegenda)}`,
            '-c:a', 'copy' // copia o áudio sem reprocessar
        ])
        .videoCodec('libx264')
        .outputOptions('-crf', '16')
        .on('start', (commandLine) => {
            console.log('FFmpeg iniciado com o comando: ' + commandLine);
        })
        .on('progress', (progress) => {
            if (progress.percent !== undefined) {
                console.log(`Processando: ${progress.percent.toFixed(2)}%`);
            } else {
                console.log(`Processando: time ${progress.timemark}`);
            }
        })
        .on('end', () => {
            console.log('Conversão finalizada com sucesso!');
            addWatermark(arquivo);
        })
        .on('error', (err) => {
            console.error('Erro ao processar o vídeo:', err.message);
        })
        .save(outputVideo);
});

function escapePath(path) {
    // Escapa espaços e caracteres especiais para o FFmpeg
    return `'${path.replace(/'/g, "'\\''")}'`;
}

function addWatermark(arquivo) {
    const inputVideo2 = `${arquivo}-Legendado.mkv`;
    const overlayImage2 = 'Logo.png';
    const outputVideo2 = `${arquivo} Legendado.mkv`;
    
    const command = ffmpeg(inputVideo2)
        .input(overlayImage2)
        .complexFilter([
            {
                filter: 'scale',
                options: {
                    w: 225,
                    h: 113
                },
                inputs: '[1:v]',
                outputs: 'logo'
            },
            {
                filter: 'overlay',
                options: {  
                    x: 50,
                    y: 'main_h-overlay_h-30'
                },
                inputs: ['[0:v]', 'logo']
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
            console.log(`Arquivo salvo como: ${outputVideo2}`);
        })
        .on('error', (err) => {
            console.error('\n❌ Erro no processamento:', err.message);
        })
        .save(outputVideo2);
}
