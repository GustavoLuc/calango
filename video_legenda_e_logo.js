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

