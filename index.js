const electron = require('electron');
const { Menu } = require('electron');
const {app, BrowserWindow} = electron;

let mainWindow; // variavel para instaciar a janela

app.on('ready', () => {
    mainWindow = new BrowserWindow({

    }); // variavel aponta para uma instância da janela

    mainWindow.loadURL(`file://${__dirname}/main.html`);//exibe o conteudo html na janela
    const mainMenu = Menu.buildFromTemplate(menuTemplate); // cria um menu a partir do molde
    Menu.setApplicationMenu(mainMenu); // define o menu da aplicação
})

const menuTemplate = [

    {
        label: 'Menu',
        submenu: [
            {
                label: 'Adicionar comentário'
            },
            {
                label: 'Sair da aplicação',
                accelerator: 'Cmd+x',
                click(){
                    app.quit();
                }
            }
        ]
    }
]; // molde para o menu

//Para o mac
if(process.platform === 'darwin'){
    menuTemplate.unshift({
        label: ""
    });
}