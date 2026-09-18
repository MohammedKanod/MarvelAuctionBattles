import java.awt.*;
import java.awt.geom.*;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;

public class ProcessLogoAssets {

    public static BufferedImage resizeAndCrop(BufferedImage src, int targetWidth, int targetHeight, boolean maskable) {
        BufferedImage output = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2 = output.createGraphics();
        g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        g2.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Fill background
        g2.setColor(new Color(0x0D, 0x0D, 0x11));
        g2.fillRect(0, 0, targetWidth, targetHeight);

        int drawW = targetWidth;
        int drawH = targetHeight;
        int drawX = 0;
        int drawY = 0;

        if (maskable) {
            // Leave 12% padding for maskable safe-zone
            int inset = (int)(targetWidth * 0.12);
            drawW = targetWidth - inset * 2;
            drawH = targetHeight - inset * 2;
            drawX = inset;
            drawY = inset;
        }

        g2.drawImage(src, drawX, drawY, drawW, drawH, null);

        // Subtle comic metallic border for standard icons
        if (!maskable) {
            g2.setColor(new Color(0x00, 0x00, 0x00, 180));
            g2.setStroke(new BasicStroke((float)(targetWidth * 0.02)));
            g2.drawRect(0, 0, targetWidth, targetHeight);
        }

        g2.dispose();
        return output;
    }

    public static void main(String[] args) throws Exception {
        File logoFile = new File("../client/public/logo.jpg");
        if (!logoFile.exists()) {
            logoFile = new File("client/public/logo.jpg");
        }
        if (!logoFile.exists()) {
            System.err.println("Could not find logo.jpg at " + logoFile.getAbsolutePath());
            System.exit(1);
        }

        BufferedImage original = ImageIO.read(logoFile);
        System.out.println("Loaded logo.jpg: " + original.getWidth() + "x" + original.getHeight());

        // 1. Save client/public/logo.png
        File clientPublic = logoFile.getParentFile();
        ImageIO.write(original, "PNG", new File(clientPublic, "logo.png"));
        System.out.println("✓ Saved client/public/logo.png");

        // 2. Save web client icons
        File iconsDir = new File(clientPublic, "icons");
        iconsDir.mkdirs();

        ImageIO.write(resizeAndCrop(original, 512, 512, false), "PNG", new File(iconsDir, "icon-512x512.png"));
        ImageIO.write(resizeAndCrop(original, 192, 192, false), "PNG", new File(iconsDir, "icon-192x192.png"));
        ImageIO.write(resizeAndCrop(original, 512, 512, true), "PNG", new File(iconsDir, "icon-512x512-maskable.png"));
        ImageIO.write(resizeAndCrop(original, 192, 192, true), "PNG", new File(iconsDir, "icon-192x192-maskable.png"));
        System.out.println("✓ Generated all client/public/icons with new Battle Auction logo");

        // 3. Save Android drawables & splash screens
        File resDir = new File("app/src/main/res");
        if (!resDir.exists()) {
            resDir = new File("android/app/src/main/res");
        }

        File[] drawables = new File[] {
            new File(resDir, "drawable"),
            new File(resDir, "drawable-nodpi"),
            new File(resDir, "drawable-xxxhdpi")
        };
        BufferedImage splashImg = resizeAndCrop(original, 512, 512, false);
        for (File d : drawables) {
            d.mkdirs();
            ImageIO.write(splashImg, "PNG", new File(d, "splash.png"));
            System.out.println("✓ Updated " + d.getPath() + "/splash.png");
        }

        // 4. Save Android mipmaps across densities
        int[][] mipmaps = new int[][] {
            { 48, 0 },  // mdpi
            { 72, 1 },  // hdpi
            { 96, 2 },  // xhdpi
            { 144, 3 }, // xxhdpi
            { 192, 4 }  // xxxhdpi
        };
        String[] densityNames = new String[] {
            "mipmap-mdpi", "mipmap-hdpi", "mipmap-xhdpi", "mipmap-xxhdpi", "mipmap-xxxhdpi"
        };

        for (int i = 0; i < mipmaps.length; i++) {
            int size = mipmaps[i][0];
            String name = densityNames[i];
            File dir = new File(resDir, name);
            dir.mkdirs();

            BufferedImage normalIcon = resizeAndCrop(original, size, size, false);
            BufferedImage maskableIcon = resizeAndCrop(original, size, size, true);

            ImageIO.write(normalIcon, "PNG", new File(dir, "ic_launcher.png"));
            ImageIO.write(maskableIcon, "PNG", new File(dir, "ic_maskable.png"));
            System.out.println("✓ Updated " + name + " (ic_launcher.png, ic_maskable.png - " + size + "x" + size + ")");
        }

        System.out.println("All logo and icon assets processed successfully!");
    }
}
