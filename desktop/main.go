package main

import (
	"context"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend
var assets embed.FS

func main() {
	app := NewApp()
	customLog := logger.NewFileLogger("debug.log")

	appErr := wails.Run(&options.App{
		Title:            "VGT Mediacenter V1.0 Beta",
		Width:            1440,
		Height:           920,
		MinWidth:         1024,
		MinHeight:        700,
		Frameless:        true,
		CSSDragProperty:  "--wails-draggable",
		CSSDragValue:     "drag",
		BackgroundColour: &options.RGBA{R: 6, G: 8, B: 13, A: 255},
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Logger:   customLog,
		LogLevel: logger.DEBUG,
		OnStartup: func(ctx context.Context) {
			customLog.Info(">>> OnStartup called!")
			app.startup(ctx)
		},
		OnDomReady: func(ctx context.Context) {
			customLog.Info(">>> OnDomReady called!")
		},
		Bind: []interface{}{
			app,
		},
		Windows: &windows.Options{
			Theme:                windows.Dark,
			WebviewGpuIsDisabled: false,
		},
	})

	if appErr != nil {
		customLog.Fatal(appErr.Error())
	}
}
