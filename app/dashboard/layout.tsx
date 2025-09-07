"use client";

import React, { useState } from "react";
import Sidebar from "./_components/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeftIcon, Bell, User } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const authState = useAppSelector((state) => state.auth);
  const account = authState.account;

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onClose={() => setSidebarOpen(false)} 
        />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64">
            <Sidebar 
              collapsed={false} 
              onClose={() => setSidebarOpen(false)} 
            />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header with Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* Desktop Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex p-2"
            >
              <PanelLeftIcon className="w-5 h-5 text-gray-500" />
            </Button>
            
            {/* Brand Name - Only show when sidebar is collapsed */}
            {sidebarCollapsed && account && (
              <div className="hidden md:block">
                <h1 className="text-lg font-medium text-foreground">
                  {account.brandName || 'Dashboard'}
                </h1>
              </div>
            )}
          </div>
          
          {/* Center Logo - Only show when sidebar is not collapsed */}
          {!sidebarCollapsed && (
            <div className="text-lg font-serif">
              <span>wardro</span>
              <span className="text-teal-500">8</span>
              <span>e</span>
            </div>
          )}
          
          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 relative"
            >
              <Bell className="w-5 h-5" />
              {/* Notification badge */}
              {account && !account.verified && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Button>
            
            {/* User Profile */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
}


