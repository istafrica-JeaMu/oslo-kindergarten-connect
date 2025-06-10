import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuardianChildProfile = () => {
  const renderContactInformation = () => (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Emergency contacts and primary phone number</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>Primary Contact:</strong> John Doe</p>
        <p><strong>Phone:</strong> +47 123 45 678</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
      </CardContent>
    </Card>
  );

  const renderLivingArrangements = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Living Arrangements</CardTitle>
            <CardDescription>Primary address and custody information</CardDescription>
          </div>
          <Link to="/living-arrangements">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View More
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <p><strong>Address:</strong> Example Street 123, 0000 Oslo</p>
        <p><strong>Custody:</strong> Joint</p>
      </CardContent>
    </Card>
  );

  const renderPickupSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Pickup Settings</CardTitle>
        <CardDescription>Authorized persons for child pickup</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>Authorized:</strong> Jane Doe, Peter Pan</p>
        <p><strong>Notes:</strong> Peter Pan only on Tuesdays</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Home className="h-4 w-4" />
        <Link to="/guardian" className="text-sm font-medium text-gray-700 hover:text-gray-900">
          Dashboard
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-sm font-medium text-gray-900">Child Profile</span>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">Child Profile</h1>
      <p className="text-muted-foreground">Manage your child's information and settings.</p>
      {renderContactInformation()}
      {renderLivingArrangements()}
      {renderPickupSettings()}
    </div>
  );
};

export default GuardianChildProfile;
