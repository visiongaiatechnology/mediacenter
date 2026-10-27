package main

import (
	"context"
	goruntime "runtime"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// WindowMinimise minimizes the native window
func (a *App) WindowMinimise() {
	if a.ctx != nil {
		runtime.WindowMinimise(a.ctx)
	}
}

// WindowToggleMaximise toggles maximize / unmaximize
func (a *App) WindowToggleMaximise() {
	if a.ctx != nil {
		runtime.WindowToggleMaximise(a.ctx)
	}
}

// WindowClose terminates the native application cleanly
func (a *App) WindowClose() {
	if a.ctx != nil {
		runtime.Quit(a.ctx)
	}
}

// WindowIsMaximised returns whether the window is currently maximized
func (a *App) WindowIsMaximised() bool {
	if a.ctx != nil {
		return runtime.WindowIsMaximised(a.ctx)
	}
	return false
}

// GetSystemInfo returns sovereign workstation runtime metrics
func (a *App) GetSystemInfo() map[string]string {
	return map[string]string{
		"os":         goruntime.GOOS,
		"arch":       goruntime.GOARCH,
		"status":     "100% Sovereign Local Workstation",
		"cloud":      "Disabled (Zero Cloud)",
		"telemetry":  "Disabled (Zero Telemetry)",
		"hypervisor": "Active (Zero-Trust Native)",
	}
}
