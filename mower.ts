import * as fs from 'fs';

const getData = (): { topRightCorner: string[], basePositions: string[][], instructions: string[] } => {
    const fileName: string = process.argv.slice(2)[0];

    if (!fileName) {
        console.error('No filename provided, usage: npm start <filename>');
        return (process.exit(1));
    }

    const fileContent: string = fs.readFileSync(fileName, 'utf8').replace(/\r/g, '');
    const topRightCorner: string[] = fileContent.split('\n')[0].split(' ');
    let basePositions: string[][] = [];
    let instructions: string[] = [];

    for (let i = 1; i < fileContent.split('\n').length; i = i + 2) {
        basePositions.push(fileContent.split('\n')[i].split(' '));
        instructions.push(fileContent.split('\n')[i + 1]);
    }
    return { topRightCorner, basePositions, instructions };
}

const main = (): void => {
    const { topRightCorner, basePositions, instructions } = getData();

    for (let i = 0; i < basePositions.length; i++) {
        let x: number = parseInt(basePositions[i][0]);
        let y: number = parseInt(basePositions[i][1]);
        let orientation: string = basePositions[i][2];
        for (let j = 0; j < instructions[i].length; j++) {
            if (instructions[i][j] === 'G') {
                switch (orientation) {
                    case 'N':
                        orientation = 'W';
                        break;
                    case 'E':
                        orientation = 'N';
                        break;
                    case 'S':
                        orientation = 'E';
                        break;
                    case 'W':
                        orientation = 'S';
                        break;
                }
            } else if (instructions[i][j] === 'D') {
                switch (orientation) {
                    case 'N':
                        orientation = 'E';
                        break;
                    case 'E':
                        orientation = 'S';
                        break;
                    case 'S':
                        orientation = 'W';
                        break;
                    case 'W':
                        orientation = 'N';
                        break;
                }
            } else if (instructions[i][j] === 'A') {
                switch (orientation) {
                    case 'N':
                        if (y < parseInt(topRightCorner[1])) {
                            y++;
                        }
                        break;
                    case 'E':
                        if (x < parseInt(topRightCorner[0])) {
                            x++;
                        }
                        break;
                    case 'S':
                        if (y > 0) {
                            y--;
                        }
                        break;
                    case 'W':
                        if (x > 0) {
                            x--;
                        }
                        break;
                }
            }
        }
        process.stdout.write(`${x} ${y} ${orientation}\n`);
    }
}

main();