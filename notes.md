# Notes

## Branch Goals and ToDos
### poc-html-composition
Implement basic page composition using pages, templates and includes using front matter.

- [] test using multiple include on a page
- [] try/catch for every io operation
- [] Pretify content
- [] Config file - input/output paths, .etc
- [] Error handling
- [x] Write content out
- [] Implement include assets
- [x] Implement file name interpolation

## Project Name
To be determined, but definitely not 'fractured'

## File Name Interpolation

File names are used to identify the file's context during page composition.

- The first segment in a file name identifies its role during page composition and it can be one of the following values:
    - template
    - page
    - include

- All files involved in page composition require at least 2 file name segments, and the last segment, the one immediately preceding the file typs, is used to name the actual file that will be

- Depending on the role the file plays during page composition, the file name may contain more than one file name segment.
    - a file whose name begins with a page must have a second file name segment that identifies the template it is to be composed  within. Example: page

### HTTP Server

Love the idea of  this. Askiing myself why spend the time creating an extensive CLI and why not instead put that effort into an interface that most people are very comfortable familiar with, namely the Web.

- Status Reports
- Help
- Site Server
- Walk user through the process of composing a page

Use Express and middleware to build this or is there something better?
