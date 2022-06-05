import { createInjectorType } from '@angular/compiler/src/render3/r3_injector_compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
declare const webkitSpeechRecognition: any;

@Component({
  selector: 'app-voice-tool',
  templateUrl: './voice-tool.component.html',
  styleUrls: ['./voice-tool.component.scss'],
})
export class VoiceToolComponent implements OnInit {
  constructor(public authService: AuthService) {
    this.init();
  }

  error = true;

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  text = '';
  temporaryWords: any;

  ngOnInit(): void {}

  init(): void {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US'; //langauge option

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result:any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.temporaryWords = transcript;
    });
  }

  /*
  start(): void {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
      } else {
        this.wordConcat();
        this.recognition.start();
        if (this.text.trim() == 'I like pizza') {
          this.stop();
          this.text = 'Cool! Pizza is fab.';
          this.error = true;
        } else if (this.text.trim() == 'I like'){
          this.stop();
          this.text = 'Try saying \'I like it\'.';
          this.error = true;
        } else {
          this.stop();
          this.text = 'I\'m not sure if I understood that.';
          this.error = true;
        }
      }
    });
    this.error = false;
  }*/

   
  start(): void {
    this.text = '';
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
      } else {
        this.wordConcat();
        this.recognition.start();
        
        switch (this.text.trim()) {
          case 'I like':
            this.stop();
            this.text = 'Try saying \'I like it\'. You always need to include the object.';
            this.error = true;
            break;
          case 'I have 24':
            this.stop();
            this.text = 'Try saying \'I AM 24\'. Don\'t use \'have\' to tell your age.';
            this.error = true;
            break;
          case 'I am 24 years':
            this.stop();
            this.text = 'Try saying \'I am 24\' or  \'I am 24 years old\' You can\'t say \'24 years\'.';
            this.error = true;
            break;
          case 'is good':
            this.stop();
            this.text = 'Try saying \'It is good.\' or  \'It\'s good\' You need to include a subject.';
            this.error = true;
            break;
          case 'I want to study a career':
            this.stop();
            this.text = '\'Career\' only relates to professional life. What you study at the university is a major or a degree.';
            this.error = true;
            break;
  


          default:
            this.stop();
            this.text = 'I\'m not sure if I understood that.';
            this.error = true;
          
        }
          
      }
    });
    this.error = false;
  }

  stop(): void {
    this.text = '';
    this.recognition.stop();
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
  }

  wordConcat(): void {
    this.text = this.text + this.temporaryWords + ' ';
    this.temporaryWords = ' ';
  }

}
