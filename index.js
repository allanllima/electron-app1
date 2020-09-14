const electron = require('electron');
const { Menu } = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow; // variavel para instaciar a janela
let commentWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration: true
        }

    }); // variavel aponta para uma instância da janela

    mainWindow.loadURL(`file://${__dirname}/main.html`);//exibe o conteudo html na janela
    mainWindow.on('closed', () => app.quit());
    const mainMenu = Menu.buildFromTemplate(menuTemplate); // cria um menu a partir do molde
    Menu.setApplicationMenu(mainMenu); // define o menu da aplicação
})

function createCommentWindow() {
    commentWindow = new BrowserWindow({
        width: 500,
        height: 300,
        title: 'Novo comentário',
        webPreferences:{
            nodeIntegration:true
        }
    });

    commentWindow.loadURL(`file://${__dirname}/comment.html`);
    commentWindow.on('closed', () => commentWindow = null);
}

ipcMain.on('addComment', (event, comment) => {
    mainWindow.webContents.send('addComment', comment);
    commentWindow.close();
})

const menuTemplate = [

    {
        label: 'Menu',
        submenu: [
            {
                label: 'Adicionar comentário',
                click() {
                    createCommentWindow();
                }
            },
            {
                label: 'Sair da aplicação',
                accelerator: 'Cmd+x',
                click() {
                    app.quit();
                }
            }
        ]
    }
]; // molde para o menu

//Para o mac
if (process.platform === 'darwin') {
    menuTemplate.unshift({
        label: ""
    });
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push(
        {
            label: 'Dev',
            submenu: [
                {
                    label: 'Debug',
                    accelerator: process.platform === 'win32' ? 'Ctrl+Shift+I' : 'Cmd+Alt+I',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                }
            ]
        }
    )
}