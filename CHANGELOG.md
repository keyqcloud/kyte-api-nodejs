# Changelog

## [1.0.3]
### Added
- Added detailed error handling for `hmacSha256` method.
- Added checks for `transactionToken` before calling `hmacSha256`.
- Improved logging in `createSession` to ensure `sessionToken` and `transactionToken` are correctly set.

### Changed
- Refactored the `getSignature` method to throw an error if `transactionToken` is not set.
- Updated the `request` method to ensure headers are correctly set.

## [1.0.2]
### Added
- Added support for environment variables using `dotenv`.
- Implemented `createSession` method for logging in and setting tokens.

### Changed
- Refactored constructor to initialize class variables for session management.

### Fixed
- Fixed issue with incorrect data encoding in `encode` method.

## [1.0.1]
### Added
- Added basic methods for GET, POST, PUT, and DELETE requests.
- Implemented HMAC SHA-256 signature generation.

### Changed
- Improved error handling for HTTP requests.

## [1.0.0]
### Added
- Initial release of `kyte-api-nodejs`.
- Basic client setup with Axios for making HTTP requests.
- Implemented authentication and session management.

