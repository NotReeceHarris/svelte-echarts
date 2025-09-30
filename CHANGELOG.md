# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [2.0.1] - 2024-09-30

### 🎉 Major Improvements

#### ✨ Features
- **New Utility Functions**: Added comprehensive utility library with data transformation, responsive design, and validation helpers
- **Accessibility Support**: Full ARIA support with configurable labels, roles, and keyboard navigation  
- **Built-in Themes**: Added `createTheme()` utility with light, dark, and colorful presets
- **Performance Optimizations**: Debounced resize handling and improved memory management
- **TypeScript Enhancements**: Removed unsafe `@ts-ignore` comments and improved type safety

#### 🔧 Utilities Added
- `formatTimeSeriesData()` - Format timestamps for chart consumption  
- `createResponsiveOptions()` - Generate responsive chart configurations
- `dataTransforms` - Collection of data manipulation utilities:
  - `toDataset()` - Convert objects to ECharts dataset format
  - `groupBy()` - Group data by key function  
  - `movingAverage()` - Calculate smoothed data series
- `validateChartOptions()` - Validate chart configurations with warnings
- `debounce()` - Debounce utility for performance optimization
- `createTheme()` - Generate predefined chart themes

#### 🎨 Enhanced Examples  
- **Comprehensive Examples Page**: New showcase with multiple chart types
- **Real-time Data Demo**: Live updating charts with moving averages
- **Accessibility Examples**: Demonstrations of screen reader and keyboard support
- **Responsive Design**: Charts that adapt to container dimensions

#### ♿ Accessibility
- Configurable ARIA labels and descriptions
- Keyboard navigation support with tabindex
- Semantic roles for screen readers
- Comprehensive documentation for accessible implementation

#### 🧪 Testing
- **Expanded Test Coverage**: 34+ new tests covering all utilities and features
- **Type Safety Tests**: Comprehensive TypeScript definition validation  
- **Edge Case Handling**: Tests for error scenarios and boundary conditions

#### 📖 Documentation
- **Complete API Reference**: Detailed documentation for all props and methods
- **Usage Examples**: Real-world examples for common use cases  
- **Migration Guide**: Help for upgrading from previous versions
- **Accessibility Guide**: Best practices for inclusive chart design

#### 🚀 Performance  
- Debounced resize observers prevent excessive redraws
- Optimized Vite configuration for better tree-shaking
- Memory leak prevention with proper cleanup

### 🔧 Technical Improvements

#### Code Quality
- Removed all `@ts-ignore` comments for better type safety
- Improved event handler type definitions
- Enhanced error handling and validation
- Better TypeScript integration

#### Build & Development
- Optimized Vite configuration
- Improved development server performance
- Enhanced hot module replacement
- Better source maps and debugging

#### Bundle Optimization  
- Improved tree-shaking configuration
- Smaller bundle sizes through selective imports
- Better dependency management

### 🐛 Bug Fixes
- Fixed TypeScript type compatibility issues in demo pages
- Resolved Chart component accessibility warnings  
- Fixed event handler type safety issues
- Improved chart disposal and cleanup

### 📦 Dependencies
- Updated to support Svelte 5.x
- Enhanced ECharts compatibility  
- Improved development tooling

### 💔 Breaking Changes
- **Minimum Svelte Version**: Now requires Svelte 5.0+
- **Event Handlers**: Event handler signatures updated for better type safety
- **Accessibility**: Default role changed from `'img'` to `'application'` for better interactivity

### 📝 Documentation
- Comprehensive README with examples and API documentation
- Type definitions for all exports  
- Migration guide for breaking changes
- Accessibility best practices guide

---

## [2.0.0] - Previous Release
- Initial Svelte 5 support
- Basic Chart component
- Core ECharts integration