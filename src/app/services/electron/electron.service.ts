import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor(private logger: LoggerService) { 
    this.logger.info('Electron service initialized');
  }

  public readFromClipboard() {
    const { clipboard } = (window as any).require('electron');
    return clipboard.readText();
  }

  public writeToClipboard(text) {
    const { clipboard } = (window as any).require('electron');
    return clipboard.writeText(text);
  }

  public clearClipboard() {
    const { clipboard } = (window as any).require('electron');
    clipboard.clear();
  }

  public openExternalLink(url) {
    const { shell } = (window as any).require('electron');
    return shell.openExternal(url);
  }
}
