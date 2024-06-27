#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();
import { configPath } from "./utils/getConfigPath.js";
import translateController from "./controllers/translateController.js";
import languagesController from "./controllers/languagesController.js";
import { generateConfigController } from "./controllers/generateConfigController.js";
import { importJSONFile } from "./utils/importJSONFile.js";
import { validEngines } from "./utils/translationEnginesUtils.js";

const { version } = await importJSONFile("./package.json", import.meta.url);

program
  .name("i18n-populator")
  .description("CLI to translate JavaScript strings")
  .version(version);

program
  .command("translate")
  .description(
    "Translate a text and put the result on the files in the output directory",
  )
  .option(
    "-t, --text <string>",
    "The word or sentence that you want to translate.",
  )
  .option(
    "-f, --from <string>",
    "The language of the text that you wrote on the --text option.",
  )
  .option(
    "-n, --name <string>",
    "The name of the property that you want your text has on the output files.",
  )
  .option(
    "-e, --engine <string>",
    `[OPTIONAL]. The engine that you want to use to translate the text. Available options: ${validEngines.join(", ")}
    If you specify a engine on the command, it will put it on the first position of the array of engines.
    If for any reason the engine you selected is not available at that moment, then it will use the engines that you have defined on the configuration file in the priority order that you selected.
    If you don't specify any engine, the script will try to get your preferences from your configuration file, and if you don't have any configuration file, it will use by default all the translation engine that are free and doesn't need API Key.`,
  )
  .option(
    "-s, --settings-file <string>",
    `[OPTIONAL]. Use this flag if you want to specify a different path for the configuration file that the default path.
    
    If you don't specify this flag, it'll search for a file called \`i18n-populator.config.json\` on the root of your project.`,
    configPath,
  )
  .action(translateController);

program
  .command("languages")
  .description("Show the languages supported in ISO-639-1 standard")
  .option(
    "-be, --by-engine <string>",
    "Filter the language supported list by engine",
  )
  .action(languagesController);

program
  .command("init")
  .description("Start the configuration wizard to create the settings file")
  .action(generateConfigController);

program.parse();
