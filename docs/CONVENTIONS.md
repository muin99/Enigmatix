# Team conventions

## Branches and PRs
- Each person works on their own dev branch (`meraz/dev`, `muin/dev`, `mahfi/dev`).
- Never push to `main`. Open a PR and ask a teammate to review.
- Merge with "Create a merge commit" so every commit stays in the history.

## Commits
- Format: `type: short message`, where type is feat, fix, chore, docs or refactor.
- One logical change per commit.

## Code
- Screens live in `src/app`, shared UI in `src/components`, state in `src/context`.
- Use the UI kit and theme tokens. No hard coded colors in screens.
- Anything temporary is marked with a `TEMP:` comment so we can find and remove it.

## Running the app
1. `npm install`
2. `npm run api` (json-server on port 3000)
3. `npx expo start`
4. `npm run reset-db` restores the seed data. Run it before committing so test data is not pushed.

## Test accounts (from db.json)
| Email | Password | Role |
|---|---|---|
| admin@enigmatix.app | admin123 | admin |
| meraz@enigmatix.app | pass1234 | user |
| muin@enigmatix.app | pass1234 | user |
| mahfi@enigmatix.app | pass1234 | user |

## Ownership
- Meraz: foundation, store, wallet, admin dashboard, payments, plans manager, BillingContext.
- Muin: crypto, SecureKeyboard, chats, outside tools, reports, announcements, audit log, ChatContext.
- Mahfi: login, signup, account, contacts, key backup, users, user detail, AuthContext, ContactsContext.
