import java.awt.*;
import java.awt.geom.*;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;

public class GenerateResources {

    private static BufferedImage createIcon(int size, boolean isMaskable) {
        BufferedImage img = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2 = img.createGraphics();
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

        double cx = size / 2.0;
        double cy = size / 2.0;
        double scale = size / 512.0;
        double contentScale = isMaskable ? 0.72 : 0.94;

        // Background
        g2.setColor(new Color(0x0D, 0x0D, 0x11));
        if (isMaskable) {
            g2.fillRect(0, 0, size, size);
        } else {
            // Soft rounded rect / circular shield
            RoundRectangle2D bg = new RoundRectangle2D.Double(cx - 240 * scale * contentScale, cy - 240 * scale * contentScale, 480 * scale * contentScale, 480 * scale * contentScale, 80 * scale, 80 * scale);
            g2.fill(bg);
        }

        // Hexagon Path
        Path2D.Double hex = new Path2D.Double();
        double hexRad = 220 * scale * contentScale;
        for (int i = 0; i < 6; i++) {
            double angle = Math.toRadians(60 * i - 30);
            double x = cx + hexRad * Math.cos(angle);
            double y = cy + hexRad * Math.sin(angle);
            if (i == 0) hex.moveTo(x, y);
            else hex.lineTo(x, y);
        }
        hex.closePath();

        // Inner Hex Fill
        g2.setPaint(new GradientPaint((float)cx, (float)(cy - hexRad), new Color(0x22, 0x18, 0x32), (float)cx, (float)(cy + hexRad), new Color(0x10, 0x0C, 0x1A)));
        g2.fill(hex);

        // Gold Hexagon Border
        g2.setPaint(new GradientPaint((float)(cx - hexRad), (float)(cy - hexRad), new Color(0xFF, 0xD7, 0x00), (float)(cx + hexRad), (float)(cy + hexRad), new Color(0xF5, 0x9E, 0x0B)));
        g2.setStroke(new BasicStroke((float)(14 * scale * contentScale), BasicStroke.CAP_ROUND, BasicStroke.JOIN_ROUND));
        g2.draw(hex);

        // Red Accent Ring
        Path2D.Double innerHex = new Path2D.Double();
        double innerRad = hexRad * 0.90;
        for (int i = 0; i < 6; i++) {
            double angle = Math.toRadians(60 * i - 30);
            double x = cx + innerRad * Math.cos(angle);
            double y = cy + innerRad * Math.sin(angle);
            if (i == 0) innerHex.moveTo(x, y);
            else innerHex.lineTo(x, y);
        }
        innerHex.closePath();
        g2.setColor(new Color(0xDC, 0x26, 0x26, 0xAA));
        g2.setStroke(new BasicStroke((float)(4 * scale * contentScale)));
        g2.draw(innerHex);

        // Left Lightning Bolt (Gold)
        Path2D.Double bolt1 = new Path2D.Double();
        double bs = scale * contentScale;
        bolt1.moveTo(cx - 10 * bs, cy - 120 * bs);
        bolt1.lineTo(cx - 65 * bs, cy - 10 * bs);
        bolt1.lineTo(cx - 20 * bs, cy - 10 * bs);
        bolt1.lineTo(cx - 50 * bs, cy + 120 * bs);
        bolt1.lineTo(cx + 15 * bs, cy + 15 * bs);
        bolt1.lineTo(cx - 25 * bs, cy + 15 * bs);
        bolt1.closePath();
        g2.setPaint(new GradientPaint((float)(cx - 65 * bs), (float)(cy - 120 * bs), new Color(0xFF, 0xEA, 0x00), (float)(cx + 15 * bs), (float)(cy + 120 * bs), new Color(0xF5, 0x9E, 0x0B)));
        g2.fill(bolt1);

        // Right Lightning Bolt (Cyan / Electric Blue)
        Path2D.Double bolt2 = new Path2D.Double();
        bolt2.moveTo(cx + 10 * bs, cy - 120 * bs);
        bolt2.lineTo(cx + 65 * bs, cy - 10 * bs);
        bolt2.lineTo(cx + 20 * bs, cy - 10 * bs);
        bolt2.lineTo(cx + 50 * bs, cy + 120 * bs);
        bolt2.lineTo(cx - 15 * bs, cy + 15 * bs);
        bolt2.lineTo(cx + 25 * bs, cy + 15 * bs);
        bolt2.closePath();
        g2.setPaint(new GradientPaint((float)(cx - 15 * bs), (float)(cy - 120 * bs), new Color(0x38, 0xBD, 0xF8), (float)(cx + 65 * bs), (float)(cy + 120 * bs), new Color(0x02, 0x84, 0xC7)));
        g2.fill(bolt2);

        // Center 5-Pointed Star
        Path2D.Double star = new Path2D.Double();
        double rOuter = 36 * scale * contentScale;
        double rInner = 15 * scale * contentScale;
        for (int i = 0; i < 10; i++) {
            double r = (i % 2 == 0) ? rOuter : rInner;
            double a = Math.toRadians(i * 36 - 90);
            double x = cx + r * Math.cos(a);
            double y = cy - 5 * scale * contentScale + r * Math.sin(a);
            if (i == 0) star.moveTo(x, y);
            else star.lineTo(x, y);
        }
        star.closePath();
        g2.setColor(Color.WHITE);
        g2.fill(star);
        g2.setStroke(new BasicStroke((float)(2 * scale * contentScale)));
        g2.setColor(new Color(0xFF, 0xD7, 0x00));
        g2.draw(star);

        g2.dispose();
        return img;
    }

    public static void main(String[] args) throws Exception {
        File resDir = new File("app/src/main/res");
        File clientIconsDir = new File("../client/public/icons");

        // 1. Drawables for Splash Screen
        File[] drawables = new File[] {
            new File(resDir, "drawable"),
            new File(resDir, "drawable-nodpi"),
            new File(resDir, "drawable-xxxhdpi")
        };
        BufferedImage splashImg = createIcon(512, false);
        for (File d : drawables) {
            d.mkdirs();
            ImageIO.write(splashImg, "PNG", new File(d, "splash.png"));
            System.out.println("✓ Wrote " + d.getPath() + "/splash.png");
        }

        // 2. Mipmaps for Launcher Icons across all standard densities
        int[][] mipmapConfigs = new int[][] {
            { 48, 0 },  // mdpi
            { 72, 1 },  // hdpi
            { 96, 2 },  // xhdpi
            { 144, 3 }, // xxhdpi
            { 192, 4 }  // xxxhdpi
        };
        String[] densityNames = new String[] {
            "mipmap-mdpi", "mipmap-hdpi", "mipmap-xhdpi", "mipmap-xxhdpi", "mipmap-xxxhdpi"
        };

        for (int i = 0; i < mipmapConfigs.length; i++) {
            int size = mipmapConfigs[i][0];
            String name = densityNames[i];
            File dir = new File(resDir, name);
            dir.mkdirs();

            BufferedImage normalIcon = createIcon(size, false);
            BufferedImage maskableIcon = createIcon(size, true);

            ImageIO.write(normalIcon, "PNG", new File(dir, "ic_launcher.png"));
            ImageIO.write(maskableIcon, "PNG", new File(dir, "ic_maskable.png"));
            System.out.println("✓ Wrote " + name + " (ic_launcher.png, ic_maskable.png - " + size + "x" + size + ")");
        }

        // 3. Also update web client public icons to keep 100% fidelity
        clientIconsDir.mkdirs();
        ImageIO.write(createIcon(192, false), "PNG", new File(clientIconsDir, "icon-192x192.png"));
        ImageIO.write(createIcon(512, false), "PNG", new File(clientIconsDir, "icon-512x512.png"));
        ImageIO.write(createIcon(192, true), "PNG", new File(clientIconsDir, "icon-192x192-maskable.png"));
        ImageIO.write(createIcon(512, true), "PNG", new File(clientIconsDir, "icon-512x512-maskable.png"));
        System.out.println("✓ Updated client/public/icons PNGs with standard ImageIO encoder");

        System.out.println("All Android & PWA icons generated successfully via Java ImageIO!");
    }
}
