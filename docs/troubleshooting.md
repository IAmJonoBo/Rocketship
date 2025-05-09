# Troubleshooting & FAQ

> **Terminology Note:** For definitions of agents, services, and plugins, see the [Rocketship Glossary](glossary.md).

This guide helps you diagnose and resolve common issues with Rocketship. For additional help, see the documentation links or report a new issue.

---

## Common Issues & Solutions

### 1. Installation Problems
- **Issue:** `pnpm install` fails or dependencies missing.
  - **Solution:** Ensure you are using Node.js 18+ and pnpm as the package manager. Run `pnpm store prune` and try again.
- **Issue:** Native module build errors (e.g., `node-gyp` failures).
  - **Solution:** Install build tools for your OS (Xcode on macOS, build-essential on Linux).

> **Note:** pnpm is the only supported package manager. Remove any npm or yarn lockfiles before installing.

### 2. Configuration Errors
- **Issue:** `rocketship.yaml` validation fails.
  - **Solution:** Check [docs/configuration.md](configuration.md) for schema and examples. Use a YAML linter.
- **Issue:** "Rocketship is not configured in this workspace."
  - **Solution:** Ensure `rocketship.yaml` exists at the workspace root and is valid.

### 3. Agent & Service Failures
- **Issue:** "Agent X failed to execute" or timeout errors.
  - **Solution:** Check agent config in `rocketship.yaml`. Review logs in the VS Code Output panel.
- **Issue:** Model loading or inference errors (e.g., "Model not found", "Ollama server not running").
  - **Solution:** Ensure the required model backend (Ollama, LM Studio, etc.) is running and accessible. See [data-retrieval.md](data-retrieval.md).

### 4. Plugin Problems
- **Issue:** "Plugin failed to load" or "Invalid plugin entry".
  - **Solution:** Verify plugin registration in `rocketship.yaml` and check file paths. See [plugins.md](plugins.md).
- **Issue:** Plugin security or permission errors.
  - **Solution:** Ensure plugins declare required capabilities and follow best practices (see [plugins.md](plugins.md)).

### 5. Test & Coverage Failures
- **Issue:** Tests fail with missing dependencies or environment errors.
  - **Solution:** Run `pnpm install` and ensure all test dependencies are present. For integration tests, ensure Docker or required containers are running.
- **Issue:** Coverage report not generated.
  - **Solution:** Run `npx vitest run --coverage --reporter=html` and check the `coverage/` directory.

---

## Debugging Tips
- Use the VS Code Output and Problems panels for error logs.
- Enable verbose logging by setting `ROCKETSHIP_DEBUG=1` in your environment.
- Use the `rocketship.diagnose` command for automated checks.
- For plugin issues, run with only core plugins enabled to isolate the problem.
- Check for updates to Rocketship and all dependencies.

---

## Frequently Asked Questions (FAQ)

**Q: How do I add a new agent or plugin?**
A: See [plugins.md](plugins.md) and [agents.md](agents.md) for registration and development guides.

**Q: How do I reset Rocketship to a clean state?**
A: Delete `rocketship.yaml`, remove the `.rocketship/` directory, and reload VS Code.

**Q: Where are logs and metrics stored?**
A: Logs are available in the VS Code Output panel. Metrics can be exported via Prometheus (see [observability.md](observability.md)).

**Q: How do I report a bug or request a feature?**
A: Open an issue on GitHub with steps to reproduce, logs, and your environment details.

---

## Reporting New Issues
- Gather logs, error messages, and your `rocketship.yaml` config.
- Search existing issues on GitHub before filing a new one.
- Include your OS, Node.js version, and Rocketship version in the report.

---

## Further Reading
- [Configuration](configuration.md)
- [Plugins & Extensions](plugins.md)
- [Agents & API](agents.md)
- [Testing & QA](testing.md)
- [Observability & Telemetry](observability.md)
- [Glossary](glossary.md)