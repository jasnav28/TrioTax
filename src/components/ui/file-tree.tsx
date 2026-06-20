"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  extension?: string
  fullPath?: string // Unique identifier, e.g., the service title
}

interface FileTreeProps {
  data: FileNode[]
  className?: string
  onFileSelect?: (node: FileNode) => void
  selectedFilePath?: string
}

interface FileItemProps {
  node: FileNode
  depth: number
  isLast: boolean
  parentPath: boolean[]
  onFileSelect?: (node: FileNode) => void
  selectedFilePath?: string
}

const getFileIcon = (extension?: string) => {
  const iconMap: Record<string, { color: string; icon: string }> = {
    tsx: { color: "text-sky-500 dark:text-sky-400", icon: "⚛" },
    ts: { color: "text-blue-500 dark:text-blue-400", icon: "◆" },
    jsx: { color: "text-cyan-500 dark:text-cyan-400", icon: "⚛" },
    js: { color: "text-yellow-500 dark:text-yellow-450", icon: "◆" },
    css: { color: "text-purple-500 dark:text-purple-400", icon: "◈" },
    json: { color: "text-orange-500 dark:text-orange-400", icon: "{}" },
    md: { color: "text-neutral-500 dark:text-neutral-400", icon: "◊" },
    svg: { color: "text-emerald-500 dark:text-emerald-405", icon: "◐" },
    png: { color: "text-rose-500 dark:text-rose-400", icon: "◑" },
    default: { color: "text-muted-foreground", icon: "◇" },
  }
  return iconMap[extension || "default"] || iconMap.default
}

function FileItem({ node, depth, isLast, parentPath, onFileSelect, selectedFilePath }: FileItemProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const isFolder = node.type === "folder"
  const hasChildren = isFolder && node.children && node.children.length > 0
  const fileIcon = getFileIcon(node.extension)
  
  const isSelected = !isFolder && selectedFilePath === node.fullPath

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFolder) {
      setIsOpen(!isOpen)
    } else if (onFileSelect) {
      onFileSelect(node)
    }
  }

  return (
    <div className="select-none">
      <div
        className={cn(
          "group relative flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer",
          "transition-all duration-150 ease-out",
          isSelected 
            ? "bg-[#7342E2]/10 dark:bg-[#7342E2]/25 text-[#7342E2] dark:text-[#a882fa] border border-[#7342E2]/10" 
            : isHovered 
              ? "bg-neutral-100/70 dark:bg-neutral-900/50" 
              : "border border-transparent"
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        {/* Tree lines */}
        {depth > 0 && (
          <div className="absolute left-0 top-0 bottom-0 flex" style={{ left: `${(depth - 1) * 14 + 14}px` }}>
            <div className={cn("w-[1.5px] transition-colors duration-150", isSelected ? "bg-[#7342E2]/40" : isHovered ? "bg-primary/40" : "bg-border/30")} />
          </div>
        )}

        {/* Folder/File toggle indicator */}
        <div
          className={cn(
            "flex items-center justify-center w-4 h-4 transition-transform duration-150 ease-out",
            isFolder && isOpen && "rotate-90",
          )}
        >
          {isFolder ? (
            <svg
              width="6"
              height="8"
              viewBox="0 0 6 8"
              fill="none"
              className={cn("transition-colors duration-150", isHovered ? "text-[#7342E2] dark:text-[#a882fa]" : "text-muted-foreground/60")}
            >
              <path
                d="M1 1L5 4L1 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span className={cn("text-xs transition-opacity duration-150 font-bold", fileIcon.color)}>{fileIcon.icon}</span>
          )}
        </div>

        {/* Icon (Folder vs File) */}
        <div
          className={cn(
            "flex items-center justify-center w-5 h-5 rounded transition-all duration-150",
            isFolder
              ? isSelected || isHovered
                ? "text-amber-500 dark:text-amber-400 scale-105"
                : "text-amber-500/80 dark:text-amber-400/80"
              : isSelected || isHovered
                ? cn(fileIcon.color, "scale-105")
                : cn(fileIcon.color, "opacity-70"),
          )}
        >
          {isFolder ? (
            <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor">
              <path d="M1.5 1C0.671573 1 0 1.67157 0 2.5V11.5C0 12.3284 0.671573 13 1.5 13H14.5C15.3284 13 16 12.3284 16 11.5V4.5C16 3.67157 15.3284 3 14.5 3H8L6.5 1H1.5Z" />
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" opacity="0.8">
              <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5V14.5C0 15.3284 0.671573 16 1.5 16H12.5C13.3284 16 14 15.3284 14 14.5V4.5L9.5 0H1.5Z" />
              <path d="M9 0V4.5H14" fill="currentColor" fillOpacity="0.5" />
            </svg>
          )}
        </div>

        {/* Name */}
        <span
          className={cn(
            "font-mono text-[13px] transition-colors duration-150 truncate max-w-[180px]",
            isFolder
              ? isHovered
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-800 dark:text-neutral-200"
              : isSelected
                ? "text-[#7342E2] dark:text-[#a882fa] font-bold"
                : isHovered
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-600 dark:text-neutral-400",
          )}
        >
          {node.name}
        </span>

        {/* Hover/Selection indicator dot */}
        <div
          className={cn(
            "absolute right-2 w-1.5 h-1.5 rounded-full bg-[#7342E2] dark:bg-[#a882fa] transition-all duration-150",
            isSelected ? "opacity-100 scale-100" : isHovered ? "opacity-40 scale-100" : "opacity-0 scale-0",
          )}
        />
      </div>

      {/* Children with animated height */}
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-out",
            isOpen ? "opacity-100" : "opacity-0 h-0",
          )}
          style={{
            maxHeight: isOpen ? `${node.children!.length * 100}px` : "0px",
          }}
        >
          {node.children!.map((child, index) => (
            <FileItem
              key={child.name}
              node={child}
              depth={depth + 1}
              isLast={index === node.children!.length - 1}
              parentPath={[...parentPath, !isLast]}
              onFileSelect={onFileSelect}
              selectedFilePath={selectedFilePath}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileTree({ data, className, onFileSelect, selectedFilePath }: FileTreeProps) {
  return (
    <div
      className={cn(
        "bg-neutral-50/50 dark:bg-neutral-950/40 rounded-2xl border border-neutral-200/60 dark:border-neutral-850/80 p-4 font-mono shadow-sm",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-200/50 dark:border-neutral-850/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-[11px] text-muted-foreground ml-2 select-none tracking-wider">services_explorer</span>
      </div>

      {/* Tree */}
      <div className="space-y-1">
        {data.map((node, index) => (
          <FileItem 
            key={node.name} 
            node={node} 
            depth={0} 
            isLast={index === data.length - 1} 
            parentPath={[]} 
            onFileSelect={onFileSelect}
            selectedFilePath={selectedFilePath}
          />
        ))}
      </div>
    </div>
  )
}
