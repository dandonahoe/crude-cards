import { faker } from "@faker-js/faker";
import { Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

/**
 * List of game codes.
 */
const gameCodes: string[] = [
    "arfs", "bahs", "bams", "bars", "bark", "bats", "bazz", "bibs", "biff", "blah",
    "blam", "bleh", "blob", "bods", "bogs", "bonk", "boob", "bops", "bork", "bozo",
    "bums", "burr", "burp", "butt", "buzz", "cabs", "cads", "chug", "clog", "cops",
    "cork", "crap", "crus", "crud", "cuds", "cuzz", "dabs", "derp", "ding", "dohs",
    "dolt", "doof", "dope", "dork", "duff", "duhs", "dumb", "dupe", "eeps", "erks",
    "face", "faps", "fart", "flip", "fobs", "fohs", "fuzz", "gahs", "gaks", "gasp",
    "glum", "gobs", "goof", "grrr", "guhs", "gulp", "gunk", "hack", "hahs", "hips",
    "hiss", "hons", "honk", "hoos", "huhs", "hump", "hurl", "jabs", "jams", "jank",
    "jars", "jeer", "jerk", "jibs", "jigs", "kaps", "klut", "lmao", "lops", "lump",
    "mash", "mehs", "meme", "mock", "mops", "muck", "nahs", "nahh", "narf", "nerd",
    "nips", "noos", "noob", "oafs", "oofs", "ooms", "oops", "ouch", "pahs", "peep",
    "perk", "pfft", "phub", "pips", "piss", "poos", "poop", "pork", "pubs",
    "puds", "puke", "punk", "quib", "rads", "rahs", "rams", "ribs", "rids", "rube",
    "saps", "scam", "sham", "sigh", "sips", "skas", "slap", "slob", "smug", "snax",
    "snip", "snob", "snub", "sops", "suck", "tads", "tahs", "taps", "tizz", "toke",
    "toot", "turd", "twat", "twit", "ughh", "uhhs", "umps", "urrs", "vexx", "wack",
    "wahs", "wees", "whiz", "whos", "wigs", "wimp", "woes", "woof", "wuss", "yaps",
    "yawn", "yays", "yepz", "yips", "yolo", "yuck", "zany", "zaps", "zapp", "zigs",
    "zing", "zits", "zong", "zoos", "zutx",
];

@Injectable()
export class UtilService {

    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly log: Logger;

    /**
     * Generates a random game code.
     *
     * @param maxLength - The maximum length of the game code.
     * @param maxAttempts - The maximum number of attempts to generate a valid game code.
     * @returns A promise that resolves to a valid game code.
     * @throws An error if unable to generate a valid game code within the specified constraints.
     */

    public generateGameCode = async (
        maxLength   : number = 3,
        maxAttempts : number = 100,
    ) => {

        if(!maxLength || maxLength <= 0)
            throw new Error(`maxLength should be a positive interger ${maxLength}`);

        if(!maxAttempts || maxAttempts <= 0)
            throw new Error(`maxAttempts should be a positive interger ${maxAttempts}`);

        const getRandomGameCode = (): string =>
            gameCodes[Math.floor(Math.random() * gameCodes.length)];

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const gameCode = getRandomGameCode();

            if (gameCode.length <= maxLength)
                return gameCode;
        }

        return faker.string.alpha(maxLength);
    }
}

// Exporting the gameCodes array for testing purposes
export { gameCodes };
