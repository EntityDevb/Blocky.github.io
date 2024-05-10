import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => 'Available commands: ' + Object.keys(commands).join(', '),
  date: () => '7th January 1976',
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case 'ls': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case 'set': {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  clear: () => {
    history.set([]);

    return '';
  },
  exit: () => {
    return 'Please close the tab to exit.';
  },
  geolocator: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ip: locate the given IP
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case '144.232.131.23': {
        result += `Unable to Access, Please wait for a supervisor.`;

        return result;
      }

      default: {
        return usage;
      }
    }
  },
  banner: () => `
██████╗░██╗░░░░░░█████╗░░█████╗░██╗░░██╗██╗░░░██╗
██╔══██╗██║░░░░░██╔══██╗██╔══██╗██║░██╔╝╚██╗░██╔╝
██████╦╝██║░░░░░██║░░██║██║░░╚═╝█████═╝░░╚████╔╝░
██╔══██╗██║░░░░░██║░░██║██║░░██╗██╔═██╗░░░╚██╔╝░░
██████╦╝███████╗╚█████╔╝╚█████╔╝██║░╚██╗░░░██║░░░
╚═════╝░╚══════╝░╚════╝░░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░ v${packageJson.version}

Type 'help' to see list of available commands.
`,
};
