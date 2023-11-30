{

  "host": "0.0.0.0",
  "port": 3001,

  "keyLength": 10,

  "maxLength": 400000,

  "staticMaxAge": 86400,

  "recompressStaticAssets": true,

  "logging": [
    {
      "level": "verbose",
      "type": "Console",
      "colorize": true
    }
  ],

  "keyGenerator": {
    "type": "phonetic"
  },

  "rateLimits": {
    "categories": {
      "normal": {
        "totalRequests": 500,
        "every": 60000
      }
    }
  },

  "storage": {
    "type": "amazon-s3",
    "bucket": "haste-bin-s3-storage",
    "region": "ap-south-1"
  },

  "documents": {
    "about": "./about.md"
  }

}
