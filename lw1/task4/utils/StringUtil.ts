export class StringUtil {
    static findEachOccurencesOfSubstring(str: string, subString: string): number[] {
        let pos = 0;
        let result: number[] = [];
        const lowerCasedStr = str.toLowerCase();

        while (lowerCasedStr.indexOf(subString, pos) != -1) {
            result.push(lowerCasedStr.indexOf(subString, pos));
            pos = lowerCasedStr.indexOf(subString, pos) + 1;
        }

        return result;
    }
}