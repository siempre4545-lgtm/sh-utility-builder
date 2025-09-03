/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'src',
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'pdf-lib', 'exceljs', 'archiver', 'unzipper'],
  },
  webpack: (config) => {
    config.externals.push({
      'sharp': 'commonjs sharp',
      'pdf-lib': 'commonjs pdf-lib',
      'exceljs': 'commonjs exceljs',
      'archiver': 'commonjs archiver',
      'unzipper': 'commonjs unzipper',
    });
    return config;
  },
  images: {
    domains: ['localhost'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
