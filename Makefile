# why-tvk — TVK Manifesto Website

# === Port Configuration ===
WEB_PORT     := 4006

.PHONY: setup install start stop

setup:
	@echo "Checking system dependencies..."
	@command -v node >/dev/null 2>&1 || { echo "Installing Node.js..."; brew install node; }
	@command -v tmux >/dev/null 2>&1 || { echo "Installing tmux..."; brew install tmux; }
	@command -v gh >/dev/null 2>&1 || { echo "Installing GitHub CLI..."; brew install gh; }

install:
	@if [ -f web/package.json ]; then cd web && npm install; else echo "Web not scaffolded yet — CEO agent will set it up."; fi

start:
	@echo "Starting why-tvk web on port $(WEB_PORT)..."
	@if [ -f web/package.json ]; then \
		lsof -ti:$(WEB_PORT) | xargs kill -9 2>/dev/null || true; \
		tmux new-session -d -s why-tvk -n web "cd web && npm run dev -- --port=$(WEB_PORT)" && \
		tmux attach -t why-tvk; \
	else \
		echo "Web not scaffolded yet. Check companyboard: cat .board/companyboard.json"; \
	fi

stop:
	@lsof -ti:$(WEB_PORT) | xargs kill -9 2>/dev/null || true
	@tmux kill-session -t why-tvk 2>/dev/null || true
