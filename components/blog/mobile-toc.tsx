"use client";

import React from "react";
import { List } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@/components/ui/drawer";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { BlogCTA } from "@/components/blog/blog-cta";

export function MobileTableOfContents() {
  return (
    <Drawer>
      <DrawerTrigger className="lg:hidden fixed bottom-6 right-6 z-50 bg-foreground text-background p-3 rounded-full shadow-lg hover:bg-foreground/90 transition-colors">
        <List size={20} />
      </DrawerTrigger>

      <DrawerContent className="lg:hidden">
        <DrawerHeader>
          <h3 className="font-semibold">Table of Contents</h3>
        </DrawerHeader>

        <DrawerBody>
          <TableOfContents />
        </DrawerBody>

        <DrawerFooter>
          <div className="p-4">
            <BlogCTA />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

