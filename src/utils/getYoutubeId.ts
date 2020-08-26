// Inspired by https://github.com/jmorrell/get-youtube-id
const getYouTubeId = (url: string, fuzzy = true): string | undefined => {
  if (/youtu\.?be/.test(url)) {
    // Look first for known patterns
    let i;
    const patterns = [
      /youtu\.be\/([^#&?]{11})/, // youtu.be/<id>
      /\?v=([^#&?]{11})/, // ?v=<id>
      /&v=([^#&?]{11})/, // &v=<id>
      /v=([^#&?]{11})/, // &v=<id>
      /embed\/([^#&?]{11})/, // embed/<id>
      /\/v\/([^#&?]{11})/, // /v/<id>
    ];

    // If any pattern matches, return the ID
    for (i = 0; i < patterns.length; i += 1) {
      if (patterns[i].test(url)) {
        return patterns[i].exec(url)?.[1];
      }
    }

    if (fuzzy) {
      // If that fails, break it apart by certain characters and look
      // for the 11 character key
      const tokens = url.split(/[/&?=#.\s]/g);
      for (i = 0; i < tokens.length; i += 1) {
        if (/^[^#&?]{11}$/.test(tokens[i])) {
          return tokens[i];
        }
      }
    }
  }

  return undefined;
};

export default getYouTubeId;
