import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Author from './apps/common/js/models/Author';
import Note from "./apps/common/js/models/Note";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  async getHello(): Promise<any> {
    // persistor fetch
    const authors: Author[] = await Author.getFromPersistWithQuery({
      name: 'Michael Crichton'
    });

    let returnString = 'Before update: Authors: <br/>';
    const author = authors[0];
    returnString += this.printAuthor(authors);

    const note = new Note();
    note.title = 'Kumar\'s book';
    note.body = 'Something about me...' + Date.now();
    author.notes.push(note);

    // persistor save using commit
    await author.save();

    const updatedAuthors: Author[] = await Author.getFromPersistWithQuery({
      name: 'Michael Crichton'
    });

    returnString  += 'After update: Authors: <br/>';
    returnString += this.printAuthor(updatedAuthors);
    return returnString;
  }

  printAuthor(authors: Author[]): string {
    return `${authors[0].name} <br/> &nbsp; ${(authors[0].notes || []).map(note => note.title + ' ' + note.body)}<br/>`;
  }
}
