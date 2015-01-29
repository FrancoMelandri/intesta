@echo off

IF EXIST "C:\\Program Files\\nodejs\\node.exe" (
	echo "C:\\Program Files\\nodejs\\node.exe" test.js sessions
	"C:\\Program Files\\nodejs\\node.exe" test.js sessions
) ELSE (
	"C:\\Program Files (x86)\\nodejs\\node.exe" test.js sessions
)